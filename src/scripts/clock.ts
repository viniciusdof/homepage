export function startClock(el: HTMLElement) {
  if (el.dataset.clockActive === "true") return;
  el.dataset.clockActive = "true";

  let shadow = el.shadowRoot;
  if (!shadow) {
    shadow = el.attachShadow({ mode: "open" });
    const span = document.createElement("span");
    span.id = "clock-inner";
    span.style.fontFamily = "inherit";
    span.style.fontSize = "inherit";
    span.style.fontWeight = "inherit";
    span.style.display = "inline-block";
    span.style.width = "100%";
    shadow.appendChild(span);
  }

  const clockInner = shadow.getElementById("clock-inner");
  if (!clockInner) return;

  const update = () => {
    if (!el.isConnected) {
      el.dataset.clockActive = "false";
      return;
    }

    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    const s = now.getSeconds().toString().padStart(2, "0");
    const timeStr = `${h}:${m}:${s}`;

    if (clockInner.textContent !== timeStr) {
      clockInner.textContent = timeStr;
    }
    
    if (el.dataset.clockActive === "true") {
      setTimeout(update, 1000);
    }
  };

  update();
}
