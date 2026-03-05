let zCounter = 100;

export function focusWindow(el: HTMLElement) {
  if (el.classList.contains("focused") && el.style.zIndex === String(zCounter)) {
    return;
  }

  zCounter++;
  el.style.zIndex = String(zCounter);

  for (const w of document.querySelectorAll(".be-window")) {
    w.classList.remove("focused");
  }

  el.classList.add("focused");
}

export function openWindow(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (win) {
    win.style.display = "flex";
    focusWindow(win);
  }
}

export function closeWindow(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (win) {
    win.style.display = "none";
    win.dispatchEvent(new CustomEvent("window-closed", { detail: { id } }));
  }
}

if (!(window as any).__windowManagerInitialized) {
  (window as any).__windowManagerInitialized = true;

  document.addEventListener("mousedown", (e) => {
    const target = e.target as HTMLElement;

    const win = target.closest(".be-window, .desktop-icon") as HTMLElement;
    if (win) {
      focusWindow(win);
    }

    const opener = target.closest(
      ".desktop-icon[data-window], .be-menu-item[data-window]",
    ) as HTMLElement;
    if (opener) {
      const id = opener.getAttribute("data-window");
      if (id) {
        openWindow(id);
      }
    }

    const closeBtn = target.closest("[data-close]");
    if (closeBtn) {
      const id = closeBtn.getAttribute("data-close");
      if (id) {
        closeWindow(id);
      }
    }
  });

  document.addEventListener("focus-window", (e) => {
    const win = (e.target as HTMLElement).closest(".be-window") as HTMLElement;
    if (win) {
      focusWindow(win);
    }
  });
}
