import vClickOutside from 'click-outside-vue3'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vClickOutside)
  nuxtApp.vueApp.directive('v-click-outside', vClickOutside)
})
