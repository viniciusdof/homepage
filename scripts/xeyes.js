export function updateXeyes(xeyesEl, x, y) {
  if (!xeyesEl) return;

  const maxShift = 1;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = Math.max(-maxShift, Math.min(maxShift, (x - centerX) / 100));
  const dy = Math.max(-maxShift, Math.min(maxShift, (y - centerY) / 100));

  const eye = `  __     __
 / o\\~~~/o \\
(   ${dy > 0.5 ? "o o" : ". ."}   )
 \\__/ ${dx > 0 ? "v" : "^"} \\__/`;

  xeyesEl.innerText = eye;
}
