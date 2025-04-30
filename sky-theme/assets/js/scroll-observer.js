export function setupScrollObserver() {

  const marker = document.createElement("div");
  marker.setAttribute("data-scroll-observer", "");
  document.querySelector("main").prepend(marker);

  const target = document.querySelector("body");
  const className = "viewport-scroll";

  const options = {
    threshold: 0.0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        target.classList.remove(className);
      } else {
        target.classList.add(className);
      }
    });
  }, options);

  observer.observe(marker);
}

export function observeAds() {

  const options = {};

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log("observe ads", entry);
    });
  }, options);

  const targets = document.querySelectorAll(".observe-ads");
  targets.forEach(target => observer.observe(target));

}
