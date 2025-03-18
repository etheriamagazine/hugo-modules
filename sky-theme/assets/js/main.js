
import { h, render, html, signal } from "jslibs/preact-bundle.js";

import { Search } from "./search.js";
import { setupScrollObserver } from "./scroll-observer.js";

import Alpine from "jslibs/alpinejs.js";


Alpine.start();

setupScrollObserver();


render(html`<${Search}  />`, document.getElementById("search"));

