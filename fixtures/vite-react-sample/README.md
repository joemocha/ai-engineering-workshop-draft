# vite-react-sample

A minimal Vite + React project used as the **edge-case fixture for framework ambiguity** in the Project Inspector eval suite (case 3).

## Why this fixture exists

This project uses **Vite + React** with **no meta-framework**. There's no Next.js, no Remix, no Nuxt — just bundler + library. The skill should report exactly that.

## What a good skill output looks like

The skill should:

- **Mention both Vite and React** — not just one
- **NOT claim** the project uses Next.js, Remix, Gatsby, or any other React meta-framework that isn't present
- **NOT claim** the project uses Nuxt or any Vue framework
- Be honest about the project being "just" a Vite + React SPA — not assume more structure than exists

## Structure

```
vite-react-sample/
├── package.json     # Vite + React deps, no meta-framework
├── vite.config.ts   # Vite config with React plugin
├── index.html       # HTML entry
├── src/
│   ├── main.tsx     # React render entry
│   └── App.tsx      # Single-component app
└── README.md
```

## What hallucination looks like (failure mode)

If the skill output says any of the following, it failed this edge case:

- "This is a Next.js application" — wrong, no Next deps
- "This is a Remix project" — wrong, no Remix deps
- "Uses React with Nuxt" — categorically wrong
- "Server-side rendered" — there's no SSR layer here, just a SPA

These failures are common in models that pattern-match on "React" → "must be Next.js" without reading the actual `package.json`.
