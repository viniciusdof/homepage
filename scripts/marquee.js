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

let index = 0;

export function updateMarquee(el) {
  const lineHeight = parseFloat(getComputedStyle(document.body).fontSize);
  const maxLines = Math.floor(el.clientHeight / lineHeight);
  const display = [];

  for (let i = 0; i < maxLines; i++) {
    const line = marqueeLines[(index + i) % marqueeLines.length];
    display.push(line);
  }

  el.innerText = display.join("\n");
  index = (index + 1) % marqueeLines.length;
}
