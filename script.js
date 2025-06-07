const companions = [
  {
    art: `
     _______
    |NEOVIM |
    |_______|
    (⌐■_■)
    /|_|
    `,
    lines: [
      ":wq é minha religião",
      "Plug 'vim-airline/vim-airline'",
      "nvim > tudo",
      "Você saiu com :q?",
      "hjkl é meu W A S D",
    ],
  },
  {
    art: `
    (\\__/)
    (•ㅅ•)
    / 　 づ
    `,
    lines: [
      "Esse site é um experimento de CSS",
      "JavaScript caótico ativado",
      "Talvez você devesse fechar isso",
    ],
  },
  {
    art: `
    (\\(\\
    (-.-)
    o_(")(")
    `,
    lines: [
      "Você ainda tá aqui?",
      "Clube do vinil eterno",
      "Se fosse estável não seria divertido",
    ],
  },
];

let currentIndex = 0;
function pickCompanion(index = 0) {
  const data = companions[index];
  document.getElementById("companion-art").innerText = data.art;
  document.getElementById("companion-dialog").innerText =
    data.lines[Math.floor(Math.random() * data.lines.length)];
}
pickCompanion();

const visitorCount = Math.floor(Math.random() * 10000) + 1;
document.getElementById("visitor-counter").innerText =
  "Visitantes: " +
  visitorCount.toLocaleString("pt-BR") +
  " (QUE INCRIVEL!!!!!!!!!!!!!!!!)";

const chaosLines = [
  "😵 VOCÊ ESTÁ NO LUGAR ERRADO",
  "👻 SAIA ENQUANTO É TEMPO",
  "💥 HTML NÃO DEVERIA FAZER ISSO",
  "🌀 ISSO AQUI É UMA VIAGEM",
  "🧠 VOCÊ AINDA TEM SANIDADE?",
  "🔊 ALERTA! ALERTA! ALERTA!",
];
function spawnChaos() {
  const el = document.createElement("div");
  el.className = "chaos-message";
  el.innerText = chaosLines[Math.floor(Math.random() * chaosLines.length)];
  el.style.top = Math.random() * window.innerHeight + "px";
  el.style.left = Math.random() * window.innerWidth + "px";
  el.style.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
  el.style.fontSize = `${10 + Math.random() * 20}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

const chaosEmojis = ["🔇", "🔊", "🛑", "😶", "🙉", "🎭"];
const companionEmojis = ["✨", "🎲", "💫", "👾", "🎉", "🧞"];

const chaosBtn = document.getElementById("toggle-chaos");
const changeBtn = document.getElementById("change-companion");

let chaosActive = false;
function updateChaosBtn() {
  const emoji = chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)];
  chaosBtn.textContent = emoji;
}
chaosBtn.addEventListener("click", () => {
  chaosActive = !chaosActive;
  updateChaosBtn();
});
updateChaosBtn();

function updateCompanionBtn() {
  const emoji =
    companionEmojis[Math.floor(Math.random() * companionEmojis.length)];
  changeBtn.textContent = emoji;
}
changeBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % companions.length;
  pickCompanion(currentIndex);
  updateCompanionBtn();
});
updateCompanionBtn();

setInterval(() => {
  if (chaosActive) spawnChaos();
}, 800);

const marqueeLines = [
  ">>> 1GB pra rodar um contador <<<",
  ">>> :q para sair <<<",
  ">>> It's bigger on the inside <<<",
  ">>> Allons-y! <<<",
  ">>> Obrigado por visitar! <<<",
  ">>> Você está em território proibido <<<",
  ">>> Digite 'exit' para sair... <<<",
  ">>> ERROR 404: Realidade não encontrada <<<",
];
let marqueeIndex = 0;
function updateMarquee() {
  const marqueeEl = document.getElementById("ascii-marquee");
  const lineHeight = parseFloat(getComputedStyle(document.body).fontSize);
  const maxLines = Math.floor(marqueeEl.clientHeight / lineHeight);
  const display = [];
  for (let i = 0; i < maxLines; i++) {
    const line = marqueeLines[(marqueeIndex + i) % marqueeLines.length];
    display.push(line);
  }
  marqueeEl.innerText = display.join("\n");
  marqueeIndex = (marqueeIndex + 1) % marqueeLines.length;
}
setInterval(updateMarquee, 1000);
updateMarquee();

const toggleButton = document.getElementById("toggle-theme");
let darkMode = true;
toggleButton.addEventListener("click", () => {
  darkMode = !darkMode;
  document.documentElement.style.setProperty(
    "--bg",
    darkMode ? "black" : "#003B8B",
  );
  document.documentElement.style.setProperty(
    "--fg",
    darkMode ? "lime" : "white",
  );
  document.documentElement.style.setProperty(
    "--border",
    darkMode ? "magenta" : "lightblue",
  );
  toggleButton.textContent = darkMode ? "🌙" : "☀️";
});

document.addEventListener("mousemove", (e) => {
  const xeyes = document.getElementById("xeyes");
  if (!xeyes) return;
  const maxShift = 1;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const dx = Math.max(
    -maxShift,
    Math.min(maxShift, (e.clientX - centerX) / 100),
  );
  const dy = Math.max(
    -maxShift,
    Math.min(maxShift, (e.clientY - centerY) / 100),
  );
  const eye = `  __     __
 / o\\~~~/o \\
(   ${dy > 0.5 ? "o o" : ". ."}   )
 \\__/ ${dx > 0 ? "v" : "^"} \\__/`;
  xeyes.innerText = eye;
});
