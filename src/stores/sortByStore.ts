import { defineStore } from 'pinia'
import { useHouseListingStore } from './houseListing'
import type { House } from '@/types'

// Store to handle sorting and searching functionality
export const useSortingByStore = defineStore({
  id: 'sortingBy',

  state: () => ({
    sortBy: null as 'price' | 'size' | null, // Sorting criteria
    searchTerm: '' // Current search term
  }),

  getters: {
    // Getter to filter and sort houses based on search term and sorting criteria
    filteredAndSortedHouses(): House[] {
      const houseStore = useHouseListingStore()
      let houses = [...houseStore.houses]

      // Apply filtering based on search term
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase().trim()
        houses = houses.filter(
          (house) =>
            house.location.city.toLowerCase().includes(searchLower) ||
            house.location.street.toLowerCase().includes(searchLower) ||
            house.location.zip.toLowerCase().includes(searchLower)
        )
      }

      // Apply sorting based on criteria
      if (this.sortBy === 'price') {
        houses.sort((a, b) => a.price - b.price)
      } else if (this.sortBy === 'size') {
        houses.sort((a, b) => a.size - b.size)
      }

      return houses
    }
  },

  actions: {
    // Action to set sorting criteria
    setSortBy(criteria: 'price' | 'size' | null) {
      this.sortBy = criteria
    },
    // Action to set the search term
    setSearchTerm(term: string) {
      this.searchTerm = term
    }
  }
})
