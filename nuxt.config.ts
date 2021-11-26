import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Shoppingify',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' },
    ],
  },
  buildModules: [
    '@vueuse/core/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    'v-tooltip/nuxt',
  ],
  privateRuntimeConfig: {
    MONGO_URL: process.env.NODE_ENV === 'development'
      ? `mongodb://localhost/${process.env.MONGO_ATLAS_DB}`
      : `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER}.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
  },
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: { scale: 1.2 }, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
    // shortcuts: [
    //   { 'Vue-Toastification__toast--success': '!bg-primary' },
    //   { 'btn-red': 'bg-primary p-15 text-card' },
    // ],
    theme: {
      colors: {
        primary: '#F9A109',
        primaryLighter: '#FFF0DE',
        secondary: '#56CCF2',
        error: '#EB5757',
        card: '#80485B',
        disabled: '#C1C1C4',
      },
    },
  },
})
