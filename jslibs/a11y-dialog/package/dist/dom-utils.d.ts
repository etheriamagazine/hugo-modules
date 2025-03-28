/**
 * Set the focus to the first element with `autofocus` with the element or the
 * element itself.
 */
export declare function focus(el: HTMLElement): void;
/**
 * Get the first and last focusable elements within a given element.
 */
export declare function getFocusableEdges(el: HTMLElement): readonly [HTMLElement | null, HTMLElement | null];
/**
 * Get the active element, accounting for Shadow DOM subtrees.
 * @author Cory LaViska
 * @see: https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
 */
export declare function getActiveEl(root?: Document | ShadowRoot): Element | null;
/**
 * Trap the focus inside the given element
 */
export declare function trapTabKey(el: HTMLElement, event: KeyboardEvent): void;
/**
 * Find the closest element to the given element matching the given selector,
 * accounting for Shadow DOM subtrees.
 * @author Louis St-Amour
 * @see: https://stackoverflow.com/a/56105394
 */
export declare function closest(selector: string, base: Element | null): Element | null;
