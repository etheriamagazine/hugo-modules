import { h, render, html, signal } from "jslibs/preact-bundle.js";

import { Search, isSearchOpen } from "./search.js";
import { setupScrollObserver, observeAds } from "./scroll-observer.js";

import Alpine from "jslibs/alpinejs.js";

Alpine.store("search", {
  show() {
    isSearchOpen.value = true;
  },
});

Alpine.start();

setupScrollObserver();
observeAds();

render(html`<${Search} />`, document.getElementById("search"));
