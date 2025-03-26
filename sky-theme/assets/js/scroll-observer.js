
export function setupScrollObserver() {

  const source = document.querySelector("[data-scroll-marker]");
  const target = document.querySelector('header');

  const className = "header-sm";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        target.classList.remove(className);
        // delete target.dataset.scroll;

      } else {
        target.classList.add(className);
        // target.dataset.scroll = 'yes';
      }
    });
  });

  observer.observe(source);
}
