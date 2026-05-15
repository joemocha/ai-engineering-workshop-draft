# nuxt-sample

A minimal Nuxt 3 application used as the **positive happy-path fixture** for the Project Inspector skill (eval case 0).

## Structure

```
nuxt-sample/
├── package.json         # Nuxt 3 deps
├── nuxt.config.ts       # Nuxt configuration
├── pages/
│   ├── index.vue        # Home page
│   └── about.vue        # About page
├── components/
│   └── Header.vue       # Shared navigation header
└── composables/
    └── useExample.ts    # Trivial composable
```

## What a good skill output looks like

The Project Inspector skill, when run against this fixture, should produce JSON identifying:

- Framework: Nuxt 3 (or Vue 3 with Nuxt)
- Entry points: `nuxt.config.ts`, `pages/index.vue`, `pages/about.vue` (at minimum)
- A brief data-flow trace through the page → component → composable shape
- Key dependencies: nuxt, vue, vue-router, typescript
- Test patterns: "No tests detected" (this fixture has no tests, which is expected for a positive minimal case)
