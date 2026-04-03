export function init(): void {
  const animateElements = document.querySelectorAll(".animate");
  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("show");
    }, index * 50);
  });
}
