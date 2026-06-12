function onScroll(): void {
  if (window.scrollY > 0) {
    document.documentElement.classList.add("scrolled");
  } else {
    document.documentElement.classList.remove("scrolled");
  }
}

let scrollListenerWired = false;

export function init(): void {
  // Keep the initial sync each call so `.scrolled` is correct after navigation.
  onScroll();
  // The scroll listener is document-level and persists across swaps; attach once.
  if (!scrollListenerWired) {
    scrollListenerWired = true;
    document.addEventListener("scroll", onScroll, { passive: true });
  }
}
