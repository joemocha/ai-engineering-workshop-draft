// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },

  // runtimeConfig holds server-side secrets and config.
  // The gateway URL and workshop VK live here — NOT in client code, NOT in the browser.
  // Bifrost holds the actual provider keys; this app only knows the gateway URL + a VK.
  runtimeConfig: {
    bifrostUrl: process.env.BIFROST_URL || 'http://localhost:8080',
    workshopVk: process.env.WORKSHOP_VK || '',
  },

  app: {
    head: {
      title: 'AI Workshop — Gateway Integration',
      meta: [
        { name: 'description', content: 'Block 4.9 — wiring Bifrost into a Vue/Nuxt app.' },
      ],
    },
  },
})
