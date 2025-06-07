export const companions = [
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

export function pickCompanion(index, elArt, elDialog) {
  const data = companions[index];
  elArt.innerText = data.art;
  elDialog.innerText = data.lines[Math.floor(Math.random() * data.lines.length)];
}
