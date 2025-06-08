# 🖥️ Homepage

**→ Read this in [English 🇺🇸](README.md)**

Esse é o meu site pessoal. É absurdamente overengineered — feito com [Leptos](https://github.com/leptos-rs/leptos) (Rust rodando no navegador, claro), empacotado com [Trunk](https://trunkrs.dev/) e estilizado com Tailwind CSS só pra exibir texto piscando e um terminal fake. Tudo roda como uma single page app, porque sim.

## ⚙️ Desenvolvimento

Este repositório vem com um `flake.nix` que prepara um ambiente completo com Rust, Trunk e Tailwind. Se você já tem o [Nix](https://nixos.org/) instalado e gosta de sofrer com estilo:

```bash
nix develop
```
Depois, suba o servidor local:

```bash
trunk serve
```
Abra http://localhost:8080 no navegador e contemple o caos. Qualquer alteração em arquivos .rs ou .css será recompilada automaticamente.

## 📦 Build

Quando quiser lançar sua obra-prima pro mundo (ou só pro Cloudflare Pages), rode:
```bash
trunk build --release
```
Isso vai gerar tudo na pasta dist, que o GitHub Actions usa via .github/workflows/cloudflare-pages-release.yml.


## 🎨 Stack Tecnológica (aka: Muita coisa pra uma página só)

- 🦀 Rust

- 🔮 Leptos

- 🌪️ Tailwind CSS

- 🧙 Trunk

- ❄️ Nix (opcional, mas divertido)

## 🧠 Mas por quê?

Porque fazer um HTML simples seria fácil demais.

## 📜 Licença

MIT. Clone, faça fork, quebre à vontade. Sem arrependimentos.
