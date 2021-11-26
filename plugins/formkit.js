import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/dist/genesis/index.esm.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, defaultConfig)
})
