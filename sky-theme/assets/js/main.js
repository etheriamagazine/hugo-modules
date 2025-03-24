
import { h, render, html, signal } from "jslibs/preact-bundle.js";

import { Search, isOpen } from "./search.js";
import { setupScrollObserver } from "./scroll-observer.js";

import Alpine from "jslibs/alpinejs.js";


Alpine.store('search', {
    show() {
      console.log("hola", isOpen.value);
        isOpen.value = true;
    }
})


Alpine.start();

setupScrollObserver();


render(html`<${Search}  />`, document.getElementById("search"));

