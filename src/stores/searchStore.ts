import { defineStore } from 'pinia'
import { useHouseListingStore } from './houseListing'
import type { House } from '@/types'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchTerm: ''
  }),

  getters: {
    filteredHouses(): House[] {
      const houseStore = useHouseListingStore()
      const searchLower = this.searchTerm.toLowerCase().trim()

      if (!searchLower) {
        return houseStore.houses
      }

      return houseStore.houses.filter((house) =>
        house.location.city.toLowerCase().includes(searchLower)
      )
    }
  },

  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term
    }
  }
})
