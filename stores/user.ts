import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: '',
      name: '',
      password: '',
      isAuthenticated: false,
    }
  },
})
