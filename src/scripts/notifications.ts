let _z = 8000;

export function showNotification(title: string, message: string, duration = 4000) {
  _z++;
  const notif = document.createElement("div");
  notif.style.cssText = [
    "position:fixed",
    "top:55px",
    "right:-260px",
    "width:220px",
    `z-index:${_z}`,
    "background:var(--be-grey)",
    "border:1px solid var(--be-black)",
    "box-shadow:2px 2px 8px rgba(0,0,0,0.4),inset 1px 1px var(--be-white),inset -1px -1px var(--be-shadow)",
    "transition:right 0.25s ease-out",
    "display:flex",
    "flex-direction:column",
    "pointer-events:auto",
    "overflow:hidden",
  ].join(";");

  notif.innerHTML = `
    <div style="background:var(--be-yellow);border-bottom:1px solid var(--be-black);padding:3px 8px;display:flex;justify-content:space-between;align-items:center;height:20px;user-select:none;">
      <span style="font-size:10px;font-weight:bold;">${title}</span>
      <button style="font-size:13px;font-weight:bold;cursor:pointer;border:none;background:transparent;padding:0;line-height:1;opacity:0.7;">&times;</button>
    </div>
    <div style="padding:8px 10px;font-size:11px;line-height:1.4;">${message}</div>
  `;

  document.body.appendChild(notif);

  const dismiss = () => {
    notif.style.right = "-260px";
    setTimeout(() => notif.remove(), 280);
  };

  notif.querySelector("button")?.addEventListener("click", (e) => {
    e.stopPropagation();
    dismiss();
  });

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      notif.style.right = "10px";
    }),
  );

  const t = setTimeout(dismiss, duration);

  return () => {
    clearTimeout(t);
    dismiss();
  };
}
