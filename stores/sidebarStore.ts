import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useGroupBy } from '~/composables/useGroupBy'

import type { IItem } from '~/server/types/item'
import type { ICategory } from '~/server/types/category'

const toast = useToast()

interface ItemList extends Omit<IItem, 'category'> {
  category: ICategory
  count: number
  checked: boolean
}

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    selectedItem: null,
    refreshItems: null,
    list: {
      name: 'Shopping list',
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
    async addItemToList(item: IItem) {
      if (this.isItemInList(item._id))
        return toast.error(`Item already added to the ${this.list.name}`)

      this.list.items.push({ count: 1, checked: false, ...item })
      toast.success(`Item successfully added to the ${this.list.name}`)
    },
    removeItemFromList(deleteItem) {
      if (!this.isItemInList(deleteItem._id))
        return toast.error(`Item can't be removed to the ${this.list.name}`)

      this.list.items = this.list.items.filter(item => item._id !== deleteItem._id)
      toast.success(`Item successfully removed to the ${this.list.name}`)
    },
  },
})
