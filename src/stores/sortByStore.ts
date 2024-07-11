import { defineStore } from 'pinia'
import { useHouseListingStore } from './houseListing'
import type { House } from '@/types'

export const useSortingByStore = defineStore({
  id: 'sortingBy',

  state: () => ({
    sortBy: null as 'price' | 'size' | null,
    searchTerm: ''
  }),

  getters: {
    filteredAndSortedHouses(): House[] {
      const houseStore = useHouseListingStore()
      let houses = [...houseStore.houses]

      // Applica il filtro
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase().trim()
        houses = houses.filter(
          (house) =>
            house.location.city.toLowerCase().includes(searchLower) ||
            house.location.street.toLowerCase().includes(searchLower) ||
            house.location.zip.toLowerCase().includes(searchLower)
        )
      }

      // Applica l'ordinamento
      if (this.sortBy === 'price') {
        houses.sort((a, b) => a.price - b.price)
      } else if (this.sortBy === 'size') {
        houses.sort((a, b) => a.size - b.size)
      }

      return houses
    }
  },

  actions: {
    setSortBy(criteria: 'price' | 'size' | null) {
      this.sortBy = criteria
    },
    setSearchTerm(term: string) {
      this.searchTerm = term
    }
  }
})
