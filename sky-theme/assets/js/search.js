import {
  h,
  render,
  html,
  signal,
  useSignal,
  useEffect,
  useRef,
  useComputed,
} from "jslibs/preact-bundle.js";

const path = "/pagefind/pagefind.js";
const pagefind = await import(path);
await pagefind.options({
  highlightParam: "highlight"
});
pagefind.init();

export function Search(props) {
  const input = useRef();
  const isOpen = useSignal(false);
  const searchText = useSignal("");
  const results = useSignal([]);
  const resultSize = useSignal(5);
  const onInput = (event) => (searchText.value = event.currentTarget.value);

  // note second parameter to useEffect
  useEffect(async () => {
    const search = await pagefind.debouncedSearch(searchText.value);

    if (search) {
      const fiveResults = await Promise.all(
        search.results.slice(0, resultSize.value).map((r) => r.data()),
      );
      results.value = fiveResults;
    } else {
      results.value = [];
    }
  }, [searchText.value, resultSize.value]);

  useEffect(() => {
    if (isOpen.value) {
      console.log("focus");
      input.current.focus();
    }
  }, [isOpen.value]);

  useEffect(() => {
    function onKeyDown(event) {
      console.log(event);
      if (
        (event.keyCode == 27 && isOpen.value) ||
        (event.key == "k" && (event.metaKey || event.ctrlKey))
      ) {
        event.preventDefault();

        // isOpen.value = !isOpen.value;
        // if(isOpen.value) {
        //   input.focus();
        //   console.log(input);
        // }

        if (isOpen.value) {
          isOpen.value = false;
        } else {
          isOpen.value = true;
        }
      }
    }
    const button = document.getElementById("search-lens");

    function onSearchLensClick(event) {
      isOpen.value = true;
    }

    window.addEventListener("keydown", onKeyDown);
    button.addEventListener("click", onSearchLensClick)
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      button.removeEventListener("click", onSearchLensClick)
    };
  }, []);

  function execute() {
    alert(searchText.value);
  }

  function loadMoreResults() {
    resultSize.value += 5;
  }

  if (isOpen.value) {
    return html` <div
      class="fixed z-30 top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex flex-col
      p-4 sm:p-8 md:p-16 lg:px-64 bg-[#0003]"
    >
      <div class="bg-white shadow-lg grow w-full rounded-lg ring-amber-300">
        <div class="flex flex-col h-full">
          <header class="flex-initial flex border-b border-b-slate-100 px-6">
            <form class="flex-auto flex items-center">
              <label>
                <svg
                  width="20"
                  height="20"
                  class="stroke-2 text-slate-600 mr-8"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                    stroke="currentColor"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </label>
              <input
                ref=${input}
                class="
                h-16
                border-0
                outline-0
                &::-webkit-search-cancel-button]:hidden
                flex-auto appearance-none focus:outline-none
                "
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                type="search"
                value=${searchText}
                onInput=${onInput}
                placeholder="Busca tu viaje..."
              />

              <button
                type="reset"
                class="
                bg-white rounded-sm border border-slate-800/15 bg-center p-1 shadow uppercase text-xs
                text-slate-800/60
                font-bold

                "
              >
                <small> Esc </small>
              </button>
            </form>
          </header>
          <div class="flex-auto max-h-[600px] overflow-y-auto">
            <ol class="p-8">

              ${results.value?.map((r) => SearchResultWithSubs(r))}
            </ol>
            <!-- <button onClick=${loadMoreResults}>Load more results</button> -->
          </div>
          <!-- <footer>SearchEngine 1.0</footer>  -->
        </div>
      </div>
    </div>`;
  } else {
    return html`<div></div>`;
    // return null;
  }
}

function SearchResultWithSubs(r) {
  // const image = useComputed(() => data.value?.meta.image);
  // const image_alt = useComputed(() => data.value?.meta.image_alt);
  // const title = useComputed(() => data.value?.meta.title);
  // const url = useComputed(() => data.value?.url);
  // const excerpt = useComputed(() => data.value?.excerpt);

  const nonRootSubresults = computeSubResults(r);

  function computeSubResults(r) {

    if (Array.isArray(r.sub_results)) {
      const hasRootSubresult =
        r.sub_results?.[0]?.url === (r.meta?.url || r.url);

      return hasRootSubresult
        ? thinSubResults(r.sub_results.slice(1), 3)
        : thinSubResults(r.sub_results, 3);
    }

    return [];
  };


  function thinSubResults(results, limit) {
    if (results.length <= limit) {
      return results;
    }

    const top_results = [...results]
      .sort((a, b) => b.locations.length - a.locations.length)
      .slice(0, 3)
      .map((r) => r.url);

    return results.filter((r) => top_results.includes(r.url));
  }


    return html`
      <li class="py-8 flex gap-4">
        <img class="mt-1 object-cover w-32"  src=${r.meta.image} alt=${r.meta.image_alt} />
        <div>
          <p class="font-bold text-slate-800">
            <a href=${r.url}>${r.meta.title}</a>
          </p>
          <p dangerouslySetInnerHTML=${{ __html: r.excerpt }}></p>

          ${nonRootSubresults.map(
            (sr) => html`
              <div class="pt-2 pl-2 text-sm text-slate-500">
                <p class="font-bold before:content-['⤷_']">
                  <a href=${sr.url}>${sr.title}</a>
                </p>
                <p dangerouslySetInnerHTML=${{ __html: sr.excerpt }}></p>
              </div>
            `,
          )}
        </div>
      </li>
    `;

}
