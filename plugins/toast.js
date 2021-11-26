import Toast, { TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: 'bottom-center',
    timeout: 2500,
    toastDefaults: {
      [TYPE.SUCCESS]: {
        toastClassName: '!bg-primary',
        icon: false,
        hideProgressBar: true,
      },
    },
  })
})
