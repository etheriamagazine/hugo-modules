
export function setupScrollObserver() {

  const source = document.querySelector("[data-scroll-marker]");
  const target = document.querySelector('header');

  const className = "-translate-y-full";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        target.classList.remove(className);
      } else {
        target.classList.add(className);
      }
    });
  });

  observer.observe(source);
}
