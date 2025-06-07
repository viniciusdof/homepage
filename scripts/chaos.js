export const chaosLines = [
  "😵 VOCÊ ESTÁ NO LUGAR ERRADO",
  "👻 SAIA ENQUANTO É TEMPO",
  "💥 HTML NÃO DEVERIA FAZER ISSO",
  "🌀 ISSO AQUI É UMA VIAGEM",
  "🧠 VOCÊ AINDA TEM SANIDADE?",
  "🔊 ALERTA! ALERTA! ALERTA!",
];

export function spawnChaos() {
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
