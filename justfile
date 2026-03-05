# List all available commands
[default]
list:
    @just --list

# Installs project dependencies
install:
    pnpm install

# Starts the local Astro development server
dev:
    pnpm dev

# Builds the project for production
build:
    pnpm build

# Previews the production build locally
preview:
    pnpm preview

# Runs the production build in a local Cloudflare Worker environment
wrangler-dev: build
    pnpm wrangler dev

# Deploys the project to Cloudflare Workers
deploy: build
    pnpm wrangler deploy

# Run lint checks
lint:
    pnpm lint

# Format code automatically
format:
    pnpm format

# Run type check
check:
    pnpm exec astro check

# Run lint, format, and type check
validate: lint format check

# Clean up build artifacts and cache
clean:
    rm -rf .astro .wrangler dist node_modules
