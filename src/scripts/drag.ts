export function enableDrag(el: HTMLElement, handle: HTMLElement) {
  if (handle.dataset.dragEnabled === "true") {
    return;
  }
  handle.dataset.dragEnabled = "true";

  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  const onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) {
      return;
    }

    const style = window.getComputedStyle(el);
    if (style.position === "fixed") {
      return;
    }

    dragging = true;
    el.classList.add("dragging");
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    el.dispatchEvent(new CustomEvent("focus-window", { bubbles: true }));

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) {
      return;
    }

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.left = `${newX}px`;
    el.style.top = `${newY}px`;
  };

  const onMouseUp = () => {
    dragging = false;
    el.classList.remove("dragging");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  handle.addEventListener("mousedown", onMouseDown);

  handle.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      const style = window.getComputedStyle(el);
      if (style.position === "fixed") {
        return;
      }

      dragging = true;
      offsetX = touch.clientX - el.offsetLeft;
      offsetY = touch.clientY - el.offsetTop;
      el.dispatchEvent(new CustomEvent("focus-window", { bubbles: true }));
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!dragging) {
        return;
      }
      const touch = e.touches[0];
      el.style.left = `${touch.clientX - offsetX}px`;
      el.style.top = `${touch.clientY - offsetY}px`;
    },
    { passive: false },
  );

  document.addEventListener("touchend", () => {
    dragging = false;
  });
}
