let lastTrigger: HTMLElement | null = null;

function getDialog(): HTMLDialogElement | null {
  return document.getElementById("pagefind-dialog") as HTMLDialogElement | null;
}

function getInput(): HTMLInputElement | null {
  const searchDiv = document.getElementById("search");
  return searchDiv?.querySelector<HTMLInputElement>("input") ?? null;
}

const PAGEFIND_CSS = "/pagefind/pagefind-ui.css";
const PAGEFIND_JS = "/pagefind/pagefind-ui.js";

// Lazy-load the Pagefind UI bundle (CSS + JS, ~26KB) and mount it into #search.
// Cached after the first call so reopening the modal never refetches or re-mounts.
let uiPromise: Promise<void> | null = null;

function loadPagefindUI(): Promise<void> {
  if (uiPromise) {
    return uiPromise;
  }
  uiPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${PAGEFIND_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = PAGEFIND_CSS;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = PAGEFIND_JS;
    script.onload = () => {
      const PagefindUI = (
        globalThis as unknown as {
          PagefindUI?: new (options: Record<string, unknown>) => unknown;
        }
      ).PagefindUI;
      if (!PagefindUI) {
        reject(new Error("PagefindUI global missing after load"));
        return;
      }
      // Mirrors the uiOptions previously passed to astro-pagefind's <Search>.
      new PagefindUI({
        element: "#search",
        bundlePath: "/pagefind/",
        showImages: false,
        excerptLength: 15,
        resetStyles: false,
      });
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load pagefind-ui.js"));
    document.head.appendChild(script);
  });
  return uiPromise;
}

async function openPagefind(): Promise<void> {
  const dialog = getDialog();
  if (!dialog) {
    return;
  }
  lastTrigger = document.activeElement as HTMLElement | null;
  // Open immediately so the modal feels instant, then mount the UI into it.
  if (!dialog.open) {
    dialog.showModal();
  }
  try {
    await loadPagefindUI();
  } catch (error) {
    console.error("Pagefind UI failed to load:", error);
    return;
  }
  const input = getInput();
  setTimeout(() => input?.focus(), 0);
}

function closePagefind(): void {
  const input = getInput();
  if (input) {
    input.value = "";
  }
  getDialog()?.close();
}

let globalsWired = false;

export function init(): void {
  // Every listener below targets a persistent thing: `document`, the
  // `#magnifying-glass` trigger (in the persisted header) and the persisted
  // `#pagefind-dialog`. These survive `astro:after-swap`, so re-running `init()`
  // would stack duplicate listeners. Wire them only on the first call.
  if (globalsWired) {
    return;
  }
  globalsWired = true;

  const magnifyingGlass = document.getElementById("magnifying-glass");
  const dialog = getDialog();

  magnifyingGlass?.addEventListener("click", () => {
    void openPagefind();
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      void openPagefind();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      void openPagefind();
    }
  });

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("pagefind-ui__result-link")) {
      closePagefind();
    }
  });

  // The dialog IS the panel, so a click on the ::backdrop reports the
  // dialog itself as the target.
  dialog?.addEventListener("click", (event: MouseEvent) => {
    if (event.target === dialog) {
      closePagefind();
    }
  });

  // Native <dialog> closes on Esc (firing both `cancel` and `close`).
  // Centralize cleanup + focus return on the `close` event so it covers
  // Esc, click-outside, and result-link clicks alike.
  dialog?.addEventListener("close", () => {
    const input = getInput();
    if (input) {
      input.value = "";
    }
    const fallback = document.getElementById("magnifying-glass");
    (lastTrigger ?? fallback)?.focus();
    lastTrigger = null;
  });

  const form = document.getElementById("form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
