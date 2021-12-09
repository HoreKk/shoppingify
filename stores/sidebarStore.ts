import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useGroupBy } from '~/composables/useGroupBy'

import type { ItemList } from '~/server/types/item'

const toast = useToast()

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    selectedItem: null,
    refreshItems: null,
    list: {
      name: null,
      state: 'edit',
      items: <ItemList[]>[],
    },
  }),
  getters: {
    isListEmpty: state => !state.list.items.length,
    getItemListIds: state => state.list.items.map(item => item._id),
    getItemListByCats: (state) => {
      const listItemGroupByCat = useGroupBy(
        state.list.items.map(item => ({ ...item, category_name: item.category.name })),
        'category_name',
      )
      return Object.entries(listItemGroupByCat).map(item => ({ name: item[0], items: <ItemList[]>item[1] }))
    },
    isItemInList() {
      return (itemId: string): boolean => this.getItemListIds.includes(itemId)
    },
  },
  actions: {
    addItemToList(item: ItemList) {
      if (this.isItemInList(item._id))
        return toast.error(`Item already added to the ${this.list.name}`)

      this.list.items.push({ count: 1, checked: false, edit: false, ...item })
      toast.success(`Item successfully added to the ${this.list.name}`)
    },
    removeItemFromList(deleteItem: ItemList) {
      if (!this.isItemInList(deleteItem._id))
        return toast.error(`Item can't be removed to the ${this.list.name}`)

      this.list.items = this.list.items.filter(item => item._id !== deleteItem._id)
      toast.success(`Item successfully removed from the ${this.list.name}`)
    },
    changePropertyFromItemInList(itemToChange: ItemList, property: string, action: string = undefined) {
      if (!this.isItemInList(itemToChange._id))
        return toast.error(`Item not in the ${this.list.name}`)

      this.list.items.forEach((item: ItemList) => {
        if (item._id === itemToChange._id) {
          switch (action) {
            case 'add':
              item[property]++
              break
            case 'minus':
              if (item[property] === 1) return
              item[property]--
              break
            default:
              item[property] = !item[property]
              break
          }
        }
      })
    },
  },
})
