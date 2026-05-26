interface StickyNote {
  id: string;
  content: string;
  x: number;
  y: number;
  color: string;
}

const COLORS = ["#fff9c4", "#c8e6c9", "#bbdefb", "#f8bbd0", "#ffe0b2"];
const STORAGE_KEY = "vdof_sticky_notes";
let _z = 500;

function load(): StickyNote[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(notes: StickyNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function escapeHtml(s: string): string {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function createEl(note: StickyNote): HTMLElement {
  const el = document.createElement("div");
  el.className = "sticky-note";
  el.dataset.id = note.id;
  el.style.cssText = [
    "position:absolute",
    `left:${note.x}px`,
    `top:${note.y}px`,
    "width:150px",
    "min-height:100px",
    `background:${note.color}`,
    "border:1px solid #000",
    "box-shadow:2px 2px 5px rgba(0,0,0,0.3),1px 1px #fff",
    `z-index:${_z}`,
    "display:flex",
    "flex-direction:column",
  ].join(";");

  el.innerHTML = `
    <div class="sn-handle" style="background:rgba(0,0,0,0.15);height:18px;cursor:move;display:flex;justify-content:space-between;align-items:center;padding:0 4px;user-select:none;border-bottom:1px solid rgba(0,0,0,0.2);flex-shrink:0;">
      <span style="font-size:8px;font-weight:bold;text-transform:uppercase;opacity:0.6;">Note</span>
      <button class="sn-close" style="font-size:13px;font-weight:bold;background:none;border:none;cursor:pointer;padding:0;line-height:1;opacity:0.6;" title="Remove">&times;</button>
    </div>
    <div class="sn-body" contenteditable="true" spellcheck="false" style="flex:1;min-height:82px;padding:6px;font-size:11px;outline:none;word-break:break-word;font-family:'Arimo',sans-serif;white-space:pre-wrap;cursor:text;">${escapeHtml(note.content)}</div>
  `;

  return el;
}

export function initStickyNotes() {
  if ((window as any).__stickyNotesInitialized) {
    return (window as any).addStickyNote || (() => {});
  }
  (window as any).__stickyNotesInitialized = true;

  const desktop = document.querySelector(".desktop") as HTMLElement;
  if (!desktop) return () => {};

  let notes = load();
  let dragging: HTMLElement | null = null;
  let ox = 0;
  let oy = 0;

  function bind(el: HTMLElement) {
    const id = el.dataset.id!;
    const handle = el.querySelector(".sn-handle") as HTMLElement;
    const body = el.querySelector(".sn-body") as HTMLElement;
    const closeBtn = el.querySelector(".sn-close") as HTMLElement;

    handle.addEventListener("mousedown", (e) => {
      if ((e.target as HTMLElement).classList.contains("sn-close")) return;
      dragging = el;
      _z++;
      el.style.zIndex = String(_z);
      ox = e.clientX - el.offsetLeft;
      oy = e.clientY - el.offsetTop;
      e.preventDefault();
    });

    body.addEventListener("input", () => {
      const note = notes.find((n) => n.id === id);
      if (note) {
        note.content = body.innerText || "";
        save(notes);
      }
    });

    closeBtn.addEventListener("click", () => {
      notes = notes.filter((n) => n.id !== id);
      save(notes);
      el.remove();
    });

    el.addEventListener("mousedown", () => {
      _z++;
      el.style.zIndex = String(_z);
    });
  }

  function render() {
    for (const el of desktop.querySelectorAll(".sticky-note")) el.remove();
    for (const note of notes) {
      const el = createEl(note);
      desktop.appendChild(el);
      bind(el);
    }
  }

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    dragging.style.left = `${e.clientX - ox}px`;
    dragging.style.top = `${e.clientY - oy}px`;
  });

  document.addEventListener("mouseup", () => {
    if (dragging) {
      const note = notes.find((n) => n.id === dragging!.dataset.id);
      if (note) {
        note.x = dragging.offsetLeft;
        note.y = dragging.offsetTop;
        save(notes);
      }
      dragging = null;
    }
  });

  render();

  return function addNote() {
    const note: StickyNote = {
      id: Date.now().toString(),
      content: "",
      x: 80 + Math.random() * Math.max(100, window.innerWidth - 350),
      y: 65 + Math.random() * Math.max(100, window.innerHeight - 250),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    notes.push(note);
    save(notes);
    const el = createEl(note);
    desktop.appendChild(el);
    bind(el);
    (el.querySelector(".sn-body") as HTMLElement)?.focus();
  };
}
