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
    ['@pinia/nuxt', { disabledVuex: true }],
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
    shortcuts: [
      { 'btn-primary': '!bg-primary !text-white' },
      { 'btn-secondary': '!bg-secondary !text-white' },
      { 'btn-white': '!bg-white' },
      { 'btn-disabled': '!bg-disabled' },
      { btn: '!font-semibold !border-transparent !rounded-xl !px-5 !py-4 disabled:!bg-disabled disabled:!text-white' },
      { 'btn-outline': '!text-primary !bg-transparent !border-2 !font-medium !border-primary !px-4.5 !py-1.75 !rounded-3xl' },
      { 'input-primary': '!py-3.5 !border-2 !border-primary !rounded-xl disabled:!border-disabled' },
    ],
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
