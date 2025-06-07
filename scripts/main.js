import { companions, pickCompanion } from "./companion.js";
import { spawnChaos } from "./chaos.js";
import { updateMarquee } from "./marquee.js";
import { toggleTheme } from "./theme.js";
import { updateXeyes } from "./xeyes.js";

let currentIndex = 0;
let darkMode = true;
let chaosActive = false;

const elArt = document.getElementById("companion-art");
const elDialog = document.getElementById("companion-dialog");
const elVisitor = document.getElementById("visitor-counter");
const elChaosBtn = document.getElementById("toggle-chaos");
const elChangeBtn = document.getElementById("change-companion");
const elMarquee = document.getElementById("ascii-marquee");
const elThemeBtn = document.getElementById("toggle-theme");
const elXeyes = document.getElementById("xeyes");

pickCompanion(currentIndex, elArt, elDialog);

elVisitor.innerText =
  "Visitantes: " + (Math.floor(Math.random() * 10000) + 1).toLocaleString("pt-BR") + " (QUE INCRIVEL!!!!!!!!!!!!!!!!)";

const companionEmojis = ["✨", "🎲", "💫", "👾", "🎉", "🧞"];
function updateCompanionBtn() {
  elChangeBtn.textContent = companionEmojis[Math.floor(Math.random() * companionEmojis.length)];
}
elChangeBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % companions.length;
  pickCompanion(currentIndex, elArt, elDialog);
  updateCompanionBtn();
});
updateCompanionBtn();

const chaosEmojis = ["🔇", "🔊", "🛑", "😶", "🙉", "🎭"];
function updateChaosBtn() {
  elChaosBtn.textContent = chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)];
}
elChaosBtn.addEventListener("click", () => {
  chaosActive = !chaosActive;
  updateChaosBtn();
});
updateChaosBtn();


setInterval(() => {
  if (chaosActive) spawnChaos();
}, 800);


setInterval(() => updateMarquee(elMarquee), 1000);
updateMarquee(elMarquee);


elThemeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  toggleTheme(darkMode);
  elThemeBtn.textContent = darkMode ? "🌙" : "☀️";
});


document.addEventListener("mousemove", (e) => {
  updateXeyes(elXeyes, e.clientX, e.clientY);
});
