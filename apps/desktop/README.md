# Prerequisites

- Node.js 22+
- pnpm 9+
- Tauri 2+
- Rust 1.79+

# Setup

```bash
pnpm install
```

# Run

```bash
pnpm dev
```

or

```bash
turbo dev # from root
```

# Install UI components

```bash
pnpm dlx shadcn@latest add
```

This adds the components to `src/components/ui`, which is not what we want. After installing, move the file to `packages/ui`, add the file to the `exports` section in `packages/ui/package.json`, and run `pnpm install`. This process will be automated in the future.
