{
  description = "Leptos development environment with Tailwind CLI";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { self, nixpkgs, flake-utils, rust-overlay }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ rust-overlay.overlays.default ];
        pkgs = import nixpkgs {
          inherit system overlays;
          config.allowUnfree = true;
        };

        rust = pkgs.rust-bin.stable.latest.default.override {
          extensions = [ "rust-src" ];
          targets = [ "wasm32-unknown-unknown" ];
        };

        tailwindcss = pkgs.stdenv.mkDerivation {
          pname = "tailwindcss";
          version = "4.1.8";
          src = pkgs.fetchurl {
            url = "https://github.com/tailwindlabs/tailwindcss/releases/download/v4.1.8/tailwindcss-linux-x64";
            sha256 = "sha256-j4TOgQvf8iXlmXgdHi2qgrQoIikCHIZ6cbQZ9Z+aqDY=";
          };
          phases = [ "installPhase" ];
          installPhase = ''
            mkdir -p $out/bin
            cp $src $out/bin/tailwindcss
            chmod +x $out/bin/tailwindcss
          '';
        };

      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            rust
            pkgs.rust-analyzer
            pkgs.trunk
            pkgs.leptosfmt
            pkgs.rustfmt
            tailwindcss
          ];
        };
      });
}
