# 🖥️ Homepage

**→ Leia em [Português 🇧🇷](README.br.md)**

This is my personal website. It's overengineered for no good reason — built with [Leptos](https://github.com/leptos-rs/leptos) (Rust in the browser, baby), bundled with [Trunk](https://trunkrs.dev/), and styled with Tailwind CLI, just to show off some blinking text and a fake terminal. Everything runs as a single page app, because why not?

## ⚙️ Development

This repo includes a `flake.nix` that sets up a full dev environment with Rust, Trunk and Tailwind. If you're a fan of deterministic suffering and already have [Nix](https://nixos.org/) installed, just:

```bash
nix develop
```
Then fire up the local server:
```bash
trunk serve
```
Visit http://localhost:8080, and behold the nonsense. Changes to .rs or .css files will auto-rebuild like magic.

## 📦 Building

When you're ready to ship your masterpiece to the world (or just Cloudflare Pages), run:
```bash
trunk build --release
```
This will spit out everything into the dist folder, which the GitHub workflow in .github/workflows/cloudflare-pages-release.yml picks up and deploys.

## 🎨 Tech Stack (a.k.a. Too Much Tech for One Page)

- 🦀 Rust

- 🔮 Leptos

- 🌪️ Tailwind CSS

- 🧙 Trunk

- ❄️ Nix (optional, but fun)


## 🧠 Why tho?

Because making a simple HTML page wasn't painful enough.

## 📜 License

MIT. Clone it, fork it, break it. No regrets.
