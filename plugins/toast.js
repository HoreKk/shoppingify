import Toast, { TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: 'bottom-center',
    timeout: 2000,
    maxToasts: 2,
    toastDefaults: {
      [TYPE.SUCCESS]: {
        toastClassName: 'btn-primary',
        icon: false,
        hideProgressBar: true,
      },
      [TYPE.ERROR]: {
        toastClassName: 'btn-error',
        icon: false,
        hideProgressBar: true,
      },
    },
  })
})
