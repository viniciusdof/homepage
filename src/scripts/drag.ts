let offsetX = 0;
let offsetY = 0;
let draggingEl: HTMLElement | null = null;

const onMouseMove = (e: MouseEvent) => {
  if (!draggingEl) {
    return;
  }

  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  draggingEl.style.right = "auto";
  draggingEl.style.bottom = "auto";
  draggingEl.style.left = `${newX}px`;
  draggingEl.style.top = `${newY}px`;
};

const onMouseUp = () => {
  if (draggingEl) {
    draggingEl.classList.remove("dragging");
    draggingEl = null;
  }
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

const onTouchMove = (e: TouchEvent) => {
  if (!draggingEl) {
    return;
  }
  const touch = e.touches[0];
  draggingEl.style.left = `${touch.clientX - offsetX}px`;
  draggingEl.style.top = `${touch.clientY - offsetY}px`;
};

const onTouchEnd = () => {
  if (draggingEl) {
    draggingEl.classList.remove("dragging");
    draggingEl = null;
  }
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
};

export function initGlobalDrag() {
  if (typeof document === "undefined") {
    return;
  }

  document.addEventListener("mousedown", (e) => {
    if (e.button !== 0) {
      return;
    }

    const handle = (e.target as HTMLElement).closest(".window-tab");
    if (!handle) {
      return;
    }

    const win = handle.closest(".be-window") as HTMLElement;
    if (!win) {
      return;
    }

    const style = window.getComputedStyle(win);
    if (style.position === "fixed") {
      return;
    }

    draggingEl = win;
    win.classList.add("dragging");
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;

    win.dispatchEvent(new CustomEvent("focus-window", { bubbles: true }));

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.preventDefault();
  });

  document.addEventListener(
    "touchstart",
    (e) => {
      const handle = (e.target as HTMLElement).closest(".window-tab");
      if (!handle) {
        return;
      }

      const win = handle.closest(".be-window") as HTMLElement;
      if (!win) {
        return;
      }

      const touch = e.touches[0];
      const style = window.getComputedStyle(win);
      if (style.position === "fixed") {
        return;
      }

      draggingEl = win;
      offsetX = touch.clientX - win.offsetLeft;
      offsetY = touch.clientY - win.offsetTop;
      win.dispatchEvent(new CustomEvent("focus-window", { bubbles: true }));

      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    },
    { passive: true },
  );
}
