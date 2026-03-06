export function triggerPanic() {
  const desktop = document.getElementById("desktop");
  if (!desktop) {
    return;
  }

  desktop.classList.add("panic-shake");

  const xeyesApp = document.getElementById("xeyes-app");
  if (xeyesApp) {
    xeyesApp.classList.add("tearing");
    for (const eye of xeyesApp.querySelectorAll(".eye")) {
      eye.classList.add("eye-shaking");
    }
  }

  const panicWindows: HTMLElement[] = [];

  const createError = () => {
    const error = document.createElement("div");
    error.className =
      "be-window panic-window absolute bg-be-grey border border-be-black z-[9999] p-1 flex flex-col shadow-2xl focused animate-bob";

    const isMobile = window.innerWidth <= 640;
    const width = isMobile ? 120 + Math.random() * 60 : 200;
    const height = isMobile ? 80 + Math.random() * 40 : 120;

    error.style.left = `${Math.random() * (window.innerWidth - width)}px`;
    error.style.top = `${Math.random() * (window.innerHeight - height)}px`;
    error.style.width = `${width}px`;
    error.style.height = `${height}px`;

    error.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
    error.style.animationDelay = `${Math.random() * 0.5}s`;
    error.style.animationDuration = `${0.4 + Math.random() * 0.2}s`;

    const panicCode = `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`;

    error.innerHTML = `
      <div class="window-tab absolute -top-[24px] -left-[1px] h-[24px] min-w-[120px] bg-red-600 border border-be-black border-b-0 px-2 flex items-center z-10 be-window-tab-clip">
        <div class="window-title font-bold text-white whitespace-nowrap select-none text-[10px]">Kernel Panic</div>
      </div>
      <div class="be-window-content-wrapper p-1 flex-1 flex flex-col min-h-0">
        <div class="be-window-content bg-be-grey border-2 border-be-shadow shadow-[1px_1px_var(--be-white),-1px_-1px_var(--be-shadow)] p-[10px] h-full overflow-hidden flex flex-col items-center justify-center text-center">
          <p class="text-red-600 font-bold text-[10px] mb-1">FATAL EXCEPTION</p>
          <p class="font-mono text-[9px] mb-2">${panicCode}</p>
          <button class="be-button text-[9px] px-2 py-0.5 reboot-btn">REBOOT</button>
        </div>
      </div>
    `;

    document.body.appendChild(error);
    panicWindows.push(error);

    error.querySelector(".reboot-btn")?.addEventListener("click", () => {
      error.remove();
    });
  };

  let count = 0;
  const interval = setInterval(() => {
    createError();
    count++;
    if (count >= 20) {
      clearInterval(interval);

      setTimeout(() => {
        for (const win of panicWindows) {
          win.remove();
        }
        desktop.classList.remove("panic-shake");

        if (xeyesApp) {
          xeyesApp.classList.remove("tearing");
          for (const eye of xeyesApp.querySelectorAll(".eye")) {
            eye.classList.remove("eye-shaking");
          }
        }
      }, 5000);
    }
  }, 100);
}
