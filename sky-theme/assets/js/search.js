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
    excerptLength: 24,
  });
  pagefind.init();
  console.log("pagefind initialized");
  return pagefind;
}

const isOpen = signal(false);

let storedSearchText = sessionStorage.getItem("Search.searchText") || "";
let storedResults = JSON.parse(
  sessionStorage.getItem("Search.results") || "[]",
);

// export signal isSearchOpen so other modules can interact
export { isOpen as isSearchOpen };

export function Search(props) {
  const input = useRef();
  const searchDone = useSignal(true);
  const searchText = useSignal(storedSearchText);
  const results = useSignal(storedResults);
  const resultSize = useSignal(5);
  const onInput = (event) => (searchText.value = event.currentTarget.value);

  // note second parameter to useEffect
  useEffect(async () => {
    if (pagefind) {
      searchDone.value = false;
      const search =
        pagefind && (await pagefind.debouncedSearch(searchText.value));

      if (search) {
        const fiveResults = await Promise.all(
          search.results.slice(0, resultSize.value).map((r) => r.data()),
        );
        results.value = fiveResults;
        searchDone.value = true;
        sessionStorage.setItem("Search.searchText", searchText.value);
        sessionStorage.setItem("Search.results", JSON.stringify(results.value));
      } else {
        results.value = [];
      }
    }
  }, [searchText.value, resultSize.value]);

  useEffect(async () => {
    if (isOpen.value) {
      document.body.classList.add("dialog-open");
      input.current?.focus();
      if (!pagefind) {
        pagefind = await importAndInitPagefind();
      }
    } else {
      document.body.classList.remove("dialog-open");
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

  function close() {
    isOpen.value = false;
  }

  if (isOpen.value) {
    return html`<aside
      role="dialog"
      class="fixed inset-4 z-30 flex flex-col overflow-hidden rounded bg-white shadow-lg sm:inset-8 lg:inset-x-64"
    >
      <header
        class="flex flex-initial border-b border-b-slate-200 px-6 text-slate-500"
      >
        <form class="flex flex-auto items-center">
          <label>
            <svg
              width="20"
              height="20"
              class="mr-8 stroke-2"
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
            class="h-16 flex-auto border-0 outline-0 focus:outline-none"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            type="search"
            value=${searchText}
            onInput=${onInput}
            placeholder="Busca artículos en Etheria Magazine"
          />

          <button
            type="reset"
            class="/60 rounded-sm border border-slate-800/15 bg-white bg-center p-1 text-xs font-bold uppercase shadow"
            onClick=${close}
          >
            <small> Esc </small>
          </button>
        </form>
      </header>
      <div class="grid flex-auto overflow-y-auto">
        ${searchText.value &&
        searchDone.value &&
        (results.value.length > 0
          ? html` <ol class="p-4">
              ${results.value?.map((r) => SearchResultWithSubs(r))}
            </ol>`
          : html`<div class="place-self-center md:text-2xl">
              🦄 Vaya, parece que no hay resultados.
            </div>`)}

        <!-- <button onClick=${loadMoreResults}>Load more results</button> -->
      </div>
      <small
        class="flex flex-initial items-end justify-end bg-gray-50 p-4 py-2 font-medium text-slate-300"
      >
        Search_by_
        <strong>Etheria Magazine</strong>
      </small>
    </aside>`;
  } else {
    // return html`<div></div>`;
    return null;
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
    <li
      class="flex gap-x-6 rounded-2xl border-b border-slate-200 p-6 last:border-b-0 hover:bg-slate-100"
    >
      <figure class="hidden flex-none md:block">
        <a href=${r.url}>
          <img
            class="aspect-4/3 mb-10 mt-1 w-48 object-cover shadow-2xl md:block"
            src=${r.meta.image}
            alt=${r.meta.image_alt}
          />
        </a>
      </figure>
      <div class="relative text-slate-600">
        <a href=${r.url}>
          <h2
            class="font-stretch-95% text-lg font-medium text-slate-800 hover:underline md:text-2xl"
          >
            ${r.meta.title}
          </h2>
        </a>

        <p class="mt-1" dangerouslySetInnerHTML=${{ __html: r.excerpt }}></p>
        ${nonRootSubresults.map(
          (sr) => html`
            <div class="pl-3 pt-2">
              <a href=${sr.url}>
                <h3
                  class="before:inline-block before:content-['⤷_'] underline"
                >
                  ${sr.title}
                </h3>
                <p dangerouslySetInnerHTML=${{ __html: sr.excerpt }}></p>
              </a>
            </div>
          `,
        )}
      </div>
    </li>
  `;
}
