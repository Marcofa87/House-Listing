import { defineStore } from 'pinia'
import { useHouseListingStore } from './houseListing'
import type { House } from '@/types'

// Store to handle search functionality
export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchTerm: '' // Current search term
  }),

  getters: {
    // Getter to filter houses based on the search term
    filteredHouses(): House[] {
      const houseStore = useHouseListingStore()
      const searchLower = this.searchTerm.toLowerCase().trim()

      if (!searchLower) {
        return houseStore.houses
      }

      return houseStore.houses.filter(
        (house) =>
          house.location.city.toLowerCase().includes(searchLower) ||
          house.location.street.toLowerCase().includes(searchLower) ||
          house.location.zip.toLowerCase().includes(searchLower)
      )
    }
  },

  actions: {
    // Action to set the search term
    setSearchTerm(term: string) {
      this.searchTerm = term
    }
  }
})
