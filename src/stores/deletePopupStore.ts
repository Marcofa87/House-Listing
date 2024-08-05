import { defineStore } from 'pinia'

// Store to manage the state of the delete confirmation popup
export const useDeletePopupStore = defineStore('deletePopup', {
  state: () => ({
    isOpen: false, // Whether the delete popup is open or closed
    houseToDeleteId: null as string | null // ID of the house to delete
  }),
  actions: {
    // Open the delete popup with a specific house ID
    openDeletePopup(houseId: string) {
      this.isOpen = true
      this.houseToDeleteId = houseId
    },
    // Close the delete popup
    closeDeletePopup() {
      this.isOpen = false
      this.houseToDeleteId = null
    }
  }
})
