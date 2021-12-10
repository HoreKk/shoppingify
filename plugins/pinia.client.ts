import { PiniaPluginContext } from 'pinia'
import { defineNuxtPlugin } from '#app'

import type { ItemList } from '~/server/types/item'

declare module 'pinia' {
  export interface PiniaCustomStateProperties {
    list: {
      name: string
      state: string
      items: ItemList[]
    }
  }
}

function PiniaPlugin({ store }: PiniaPluginContext) {
  const listActive = useStorage('shoppingify-active-list', {
    name: null,
    state: 'view',
    items: <ItemList[]>[],
  })
  listActive.value.items.forEach(item => item.edit = false)
  store.list = listActive.value
  store.$state.list = listActive.value
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.pinia.use(PiniaPlugin)
})
