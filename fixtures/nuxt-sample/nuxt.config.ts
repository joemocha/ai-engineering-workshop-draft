// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: [],
  app: {
    head: {
      title: 'Nuxt Sample',
      meta: [
        { name: 'description', content: 'A small Nuxt 3 sample app used as a workshop fixture.' },
      ],
    },
  },
})
