export function initScreenSaver(timeout = 60_000) {
  if ((window as any).__screenSaverInitialized) return;
  (window as any).__screenSaverInitialized = true;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let active = false;
  let animFrame: number | null = null;

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:#000;z-index:99998;display:none;cursor:none;";

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "display:block;";
  overlay.appendChild(canvas);
  document.body.appendChild(overlay);

  function start() {
    if (active) return;
    active = true;
    overlay.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d")!;
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF@#$%&".split("");

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const c = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(c, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animFrame = requestAnimationFrame(draw);
    }

    draw();
  }

  function stop() {
    if (!active) return;
    active = false;
    overlay.style.display = "none";
    if (animFrame !== null) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
    reset();
  }

  function reset() {
    if (timer) clearTimeout(timer);
    if (!active) timer = setTimeout(start, timeout);
  }

  document.addEventListener("mousemove", reset, { passive: true });
  document.addEventListener("input", reset, { passive: true });

  document.addEventListener(
    "mousedown",
    (e) => {
      if (active) {
        e.preventDefault();
        e.stopPropagation();
        stop();
      } else {
        reset();
      }
    },
    true,
  );

  document.addEventListener(
    "keydown",
    (e) => {
      if (active) {
        e.preventDefault();
        e.stopPropagation();
        stop();
      } else {
        reset();
      }
    },
    true,
  );

  document.addEventListener(
    "touchstart",
    () => {
      if (active) {
        stop();
      } else {
        reset();
      }
    },
    { passive: true },
  );

  reset();
}
