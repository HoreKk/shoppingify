import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => {
    return {
      selectedItem: null,
      refreshListItems: null,
    }
  },
  getters: {
    getSelectedItem: state => state.selectedItem,
  },
})
