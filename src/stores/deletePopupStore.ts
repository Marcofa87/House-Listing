import { defineStore } from 'pinia'

export const useDeletePopupStore = defineStore('deletePopup', {
  state: () => ({
    isOpen: false,
    houseToDeleteId: null as string | null
  }),
  actions: {
    openDeletePopup(houseId: string) {
      this.isOpen = true
      this.houseToDeleteId = houseId
    },
    closeDeletePopup() {
      this.isOpen = false
      this.houseToDeleteId = null
    }
  }
})
