function openPagefind(): void {
  const searchDiv = document.getElementById("search");
  const search = searchDiv?.querySelector<HTMLInputElement>("input");
  setTimeout(() => {
    search?.focus();
  }, 0);
  const backdrop = document.getElementById("backdrop");
  backdrop?.classList.remove("invisible");
  backdrop?.classList.add("visible");
}

function closePagefind(): void {
  const searchDiv = document.getElementById("search");
  const search = searchDiv?.querySelector<HTMLInputElement>("input");
  if (search) {
    search.value = "";
  }
  const backdrop = document.getElementById("backdrop");
  backdrop?.classList.remove("visible");
  backdrop?.classList.add("invisible");
}

export function init(): void {
  const magnifyingGlass = document.getElementById("magnifying-glass");
  const backdrop = document.getElementById("backdrop");

  magnifyingGlass?.addEventListener("click", () => {
    openPagefind();
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      openPagefind();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openPagefind();
    }
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closePagefind();
    }
  });

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("pagefind-ui__result-link")) {
      closePagefind();
    }
  });

  backdrop?.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#pagefind-container")) {
      closePagefind();
    }
  });

  const form = document.getElementById("form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
