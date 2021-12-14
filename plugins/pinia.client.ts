import { PiniaPluginContext } from 'pinia'
import type { PiniaCustomStateProperties } from 'pinia'
import { defineNuxtPlugin } from '#app'

import type { ItemList } from '~/server/types/item'

declare module 'pinia' {
  export interface PiniaCustomStateProperties {
    list: {
      _id: null | string
      name: null | string
      state: string
      items: ItemList[]
    }
  }
}

async function PiniaPlugin({ store }: PiniaPluginContext) {
  const list = await $fetch<PiniaCustomStateProperties['list']>('/api/list/list')
  if (list) {
    list.items = list.items.map(item => ({ ...item, ...item._id }))
    store.list = list
    store.$state.list = list
    localStorage.removeItem('shoppingify-active-list')
  }
  else {
    const listActive = useStorage('shoppingify-active-list', {
      _id: null,
      name: null,
      state: 'active',
      items: <ItemList[]>[],
    })
    listActive.value.items.forEach(item => item.edit = false)
    store.list = listActive.value
    store.$state.list = listActive.value
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.pinia.use(PiniaPlugin)
})
