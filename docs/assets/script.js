// Workshop interactive helpers
// - Press `s` to toggle speaker notes (or ?notes=1 in URL)
// - Auto-add copy buttons to every <pre> code block
// - Optional: arrow keys for prev/next (configured per-page via data-prev / data-next)

(function () {
  "use strict";

  // ============================================================
  // Speaker-notes toggle
  // ============================================================

  function setNotesMode(on) {
    document.body.classList.toggle("show-notes", !!on);
    try {
      localStorage.setItem("workshop:notes", on ? "1" : "0");
    } catch (e) {
      // localStorage may be unavailable in private browsing — ignore
    }
  }

  function initNotesMode() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("notes") === "1") {
      setNotesMode(true);
      return;
    }
    try {
      if (localStorage.getItem("workshop:notes") === "1") {
        setNotesMode(true);
      }
    } catch (e) {
      // ignore
    }
  }

  function bindNotesKey() {
    document.addEventListener("keydown", function (e) {
      // Don't hijack when typing in an input/textarea
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;

      if (e.key === "s" || e.key === "S") {
        setNotesMode(!document.body.classList.contains("show-notes"));
      }
    });
  }

  // ============================================================
  // Copy buttons on every <pre>
  // ============================================================

  function attachCopyButtons() {
    const blocks = document.querySelectorAll(".code-block");
    blocks.forEach((block) => {
      // If a header already exists with a copy button, skip
      if (block.querySelector(".copy-btn")) return;

      const codeEl = block.querySelector("pre code, pre");
      if (!codeEl) return;

      // Look for or create a header strip
      let header = block.querySelector(".code-block-header");
      if (!header) {
        header = document.createElement("div");
        header.className = "code-block-header";
        const label = document.createElement("span");
        label.textContent = block.dataset.label || "CODE";
        header.appendChild(label);
        block.insertBefore(header, block.firstChild);
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        const text = codeEl.innerText;
        navigator.clipboard.writeText(text).then(
          () => {
            btn.textContent = "Copied!";
            btn.classList.add("copied");
            setTimeout(() => {
              btn.textContent = "Copy";
              btn.classList.remove("copied");
            }, 1400);
          },
          () => {
            btn.textContent = "Copy failed";
            setTimeout(() => (btn.textContent = "Copy"), 1400);
          }
        );
      });
      header.appendChild(btn);
    });
  }

  // ============================================================
  // Hide empty demo blocks
  // A "demo block" is empty when the only content (after the label
  // span) is a single <p> that starts with "None" or "N/A".
  // ============================================================

  function hideEmptyDemoBlocks() {
    document.querySelectorAll(".demo-block").forEach((block) => {
      // Explicit override always wins
      if (block.classList.contains("is-empty")) {
        block.style.display = "none";
        return;
      }

      // Get content children, excluding the label span
      const contentChildren = Array.from(block.children).filter(
        (el) => !el.classList.contains("block-label")
      );

      // Only hide when there's exactly one paragraph after the label
      if (contentChildren.length !== 1) return;
      if (contentChildren[0].tagName !== "P") return;

      // And that paragraph starts with "None" or "N/A"
      const text = (contentChildren[0].textContent || "").trim();
      if (/^(none|n\/a)\b/i.test(text)) {
        block.style.display = "none";
      }
    });
  }

  // ============================================================
  // Keyboard arrow nav
  // ============================================================

  function bindArrowNav() {
    const prev = document.body.dataset.prev;
    const next = document.body.dataset.next;
    if (!prev && !next) return;

    document.addEventListener("keydown", function (e) {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      if (e.key === "ArrowLeft" && prev) {
        window.location.href = prev;
      } else if (e.key === "ArrowRight" && next) {
        window.location.href = next;
      }
    });
  }

  // ============================================================
  // Init
  // ============================================================

  document.addEventListener("DOMContentLoaded", function () {
    initNotesMode();
    bindNotesKey();
    attachCopyButtons();
    hideEmptyDemoBlocks();
    bindArrowNav();
  });
})();
