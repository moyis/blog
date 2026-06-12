export function init(): void {
  const copyButtonLabel = "\u{1F4CB}";
  const codeBlocks = Array.from(document.querySelectorAll("pre"));

  async function copyCode(
    codeBlock: HTMLPreElement,
    copyButton: HTMLButtonElement,
  ): Promise<void> {
    const codeText = codeBlock.innerText;
    const buttonText = copyButton.innerText;
    const textToCopy = codeText.replace(buttonText, "");

    await navigator.clipboard.writeText(textToCopy);
    copyButton.innerText = "\u2705";

    setTimeout(() => {
      copyButton.innerText = copyButtonLabel;
    }, 2000);
  }

  for (const codeBlock of codeBlocks) {
    // Skip blocks already processed on a prior `init()`. Without this, re-running
    // on `astro:after-swap` re-wraps each `<pre>` and appends a second copy
    // button. Freshly navigated pages have new `<pre>` nodes, so they process once.
    if (codeBlock.dataset.copyReady) {
      continue;
    }
    codeBlock.dataset.copyReady = "true";

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.innerText = copyButtonLabel;
    copyButton.classList.add("copy-code");
    copyButton.setAttribute("type", "button");
    copyButton.setAttribute("aria-label", "Copiar código");

    codeBlock.setAttribute("tabindex", "0");
    codeBlock.appendChild(copyButton);

    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      await copyCode(codeBlock, copyButton);
    });
  }
}
