export function initXEyes(container: HTMLElement) {
  const pupils = container.querySelectorAll(".pupil") as NodeListOf<HTMLElement>;
  const eyes = container.querySelectorAll(".eye") as NodeListOf<HTMLElement>;
  const windowEl = container.closest(".be-window") as HTMLElement;

  let lastX = 0;
  let lastY = 0;
  let velocity = 0;
  let rafId: number | null = null;

  const updateEyes = (mouseX: number, mouseY: number) => {
    if (document.getElementById("desktop")?.classList.contains("panic-shake")) {
      return;
    }

    if (container.classList.contains("evil")) {
      container.classList.remove("evil");
    }

    const isDragging = windowEl?.classList.contains("dragging");
    if (isDragging) {
      if (!container.classList.contains("tearing")) container.classList.add("tearing");
      eyes.forEach((eye) => {
        if (!eye.classList.contains("eye-shaking")) eye.classList.add("eye-shaking");
      });
      if (container.classList.contains("dizzy")) container.classList.remove("dizzy");
      eyes.forEach((eye) => {
        if (eye.style.backgroundColor !== "white") eye.style.backgroundColor = "white";
      });
    } else {
      if (container.classList.contains("tearing")) container.classList.remove("tearing");
      eyes.forEach((eye) => {
        if (eye.classList.contains("eye-shaking")) eye.classList.remove("eye-shaking");
      });

      const isMobile = window.innerWidth <= 640;

      if (velocity > 50 && !isMobile) {
        if (!container.classList.contains("dizzy")) container.classList.add("dizzy");
        eyes.forEach((eye) => {
          if (eye.style.backgroundColor !== "") eye.style.backgroundColor = "";
        });
      } else {
        if (container.classList.contains("dizzy")) container.classList.remove("dizzy");
        eyes.forEach((eye) => {
          if (eye.style.backgroundColor !== "white") eye.style.backgroundColor = "white";
        });
      }
    }

    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    velocity = Math.sqrt(dx * dx + dy * dy);
    lastX = mouseX;
    lastY = mouseY;

    pupils.forEach((pupil, i) => {
      const eye = eyes[i];
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const mouseDx = mouseX - eyeX;
      const mouseDy = mouseY - eyeY;
      const angle = Math.atan2(mouseDy, mouseDx);

      const distance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      const limit = rect.width / 4;

      const size = isDragging ? "10px" : velocity > 40 ? "25px" : "20px";
      if (pupil.style.width !== size) {
        pupil.style.width = size;
        pupil.style.height = size;
      }

      const moveX = Math.cos(angle) * Math.min(distance, limit);
      const moveY = Math.sin(angle) * Math.min(distance, limit);

      const transform = isDragging 
        ? `translate(${moveX + (Math.random() - 0.5) * 5}px, ${moveY + (Math.random() - 0.5) * 5}px)`
        : `translate(${moveX}px, ${moveY}px)`;

      if (pupil.style.transform !== transform) {
        pupil.style.transform = transform;
      }

      if (velocity > 50 && !isDragging) {
        if (!pupil.classList.contains("animate-spin")) pupil.classList.add("animate-spin");
      } else {
        if (pupil.classList.contains("animate-spin")) pupil.classList.remove("animate-spin");
      }
      
      if (pupil.style.backgroundColor !== "black") {
        pupil.style.backgroundColor = "black";
      }
      
      if (pupil.style.boxShadow !== "none") pupil.style.boxShadow = "none";
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => updateEyes(e.clientX, e.clientY));
  };

  const setEvilMode = () => {
    if (rafId) cancelAnimationFrame(rafId);
    container.classList.add("evil");
    container.classList.remove("tearing");
    container.classList.remove("dizzy");
    eyes.forEach((eye) => {
      eye.style.backgroundColor = "black";
      eye.classList.remove("eye-shaking");
    });
    pupils.forEach((pupil) => {
      pupil.style.backgroundColor = "red";
      pupil.style.boxShadow = "0 0 15px red";
      pupil.style.transform = "translate(0, 0) scale(1.4)";
      pupil.style.width = "20px";
      pupil.style.height = "20px";
      pupil.classList.remove("animate-spin");
    });
  };

  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => updateEyes(t.clientX, t.clientY));
      }
    },
    { passive: false },
  );

  document.documentElement.addEventListener("mouseleave", setEvilMode);

  window.addEventListener("blur", setEvilMode);

  document.addEventListener("mouseenter", () => {
    eyes.forEach((eye) => {
      if (eye.style.backgroundColor !== "white") eye.style.backgroundColor = "white";
    });
  });
}
