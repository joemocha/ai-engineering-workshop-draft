# monorepo-sample

A minimal two-package monorepo used as the **positive complexity fixture** for the Project Inspector skill (eval case 1).

## Structure

```
monorepo-sample/
├── package.json              # Root workspace config (npm/pnpm workspaces)
├── pnpm-workspace.yaml       # pnpm workspace declaration
└── packages/
    ├── api/                  # Fastify HTTP service
    │   ├── package.json
    │   └── src/
    │       └── index.ts
    └── web/                  # Vue 3 + Vite frontend
        ├── package.json
        └── src/
            └── main.ts
```

## What a good skill output looks like

The skill should identify:

- **Two distinct packages**: `@sample/api` (Fastify backend) and `@sample/web` (Vue + Vite frontend)
- **Two distinct entry points**: `packages/api/src/index.ts` and `packages/web/src/main.ts`
- **Workspace structure**: monorepo using pnpm workspaces
- A brief note on how the two packages relate (or that they don't currently — they're independent)
