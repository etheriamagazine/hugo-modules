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

let pagefind;

async function importAndInitPagefind() {
  const path = "/pagefind/pagefind.js";
  const pagefind = await import(path);
  await pagefind.options({
    highlightParam: "highlight",
  });
  pagefind.init();
  console.log("pagefind initialized");
  return pagefind;
}

const isOpen = signal(false);

// export signal isSearchOpen so other modules can interact
export { isOpen as isSearchOpen };

export function Search(props) {
  const input = useRef();
  const searchText = useSignal("");
  const results = useSignal([]);
  const resultSize = useSignal(5);
  const onInput = (event) => (searchText.value = event.currentTarget.value);

  // note second parameter to useEffect
  useEffect(async () => {

    const search = pagefind && await pagefind.debouncedSearch(searchText.value);

    if (search) {
      const fiveResults = await Promise.all(
        search.results.slice(0, resultSize.value).map((r) => r.data()),
      );
      results.value = fiveResults;
    } else {
      results.value = [];
    }
  }, [searchText.value, resultSize.value]);

  useEffect(async () => {
    if (isOpen.value) {
      console.log("focus");
      input.current.focus();
      if (!pagefind) {
        pagefind = await importAndInitPagefind();
      }
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
        isOpen.value = !isOpen.value;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function loadMoreResults() {
    resultSize.value += 5;
  }

  if (isOpen.value) {
    return html` <div
      class="fixed bottom-0 left-0 right-0 top-0 z-30 flex flex-col bg-[#0003] p-4 backdrop-blur-sm sm:p-8 md:p-16 lg:px-64"
    >
      <div class="w-full grow rounded-lg bg-white shadow-lg ring-amber-300">
        <div class="flex h-full flex-col">
          <header class="flex flex-initial border-b border-b-slate-100 px-6">
            <form class="flex flex-auto items-center">
              <label>
                <svg
                  width="20"
                  height="20"
                  class="mr-8 stroke-2 text-slate-600"
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
                class="&::-webkit-search-cancel-button]:hidden h-16 flex-auto appearance-none border-0 outline-0 focus:outline-none"
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
                class="rounded-sm border border-slate-800/15 bg-white bg-center p-1 text-xs font-bold uppercase text-slate-800/60 shadow"
              >
                <small> Esc </small>
              </button>
            </form>
          </header>
          <div class="max-h-[600px] flex-auto overflow-y-auto">
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
  }

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
    <li class="flex gap-4 py-8">
      <img
        class="mt-1 w-32 object-cover"
        src=${r.meta.image}
        alt=${r.meta.image_alt}
      />
      <div>
        <p class="font-bold text-slate-800">
          <a href=${r.url}>${r.meta.title}</a>
        </p>
        <p dangerouslySetInnerHTML=${{ __html: r.excerpt }}></p>

        ${nonRootSubresults.map(
          (sr) => html`
            <div class="pl-2 pt-2 text-sm text-slate-500">
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
