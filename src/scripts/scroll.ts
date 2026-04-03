function onScroll(): void {
  if (window.scrollY > 0) {
    document.documentElement.classList.add("scrolled");
  } else {
    document.documentElement.classList.remove("scrolled");
  }
}

export function init(): void {
  onScroll();
  document.addEventListener("scroll", onScroll);
}
