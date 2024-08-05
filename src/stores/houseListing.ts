import { defineStore } from 'pinia'
import type { House } from '@/types'

const HOUSE_LISTING_API_KEY = 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'

export const useHouseListingStore = defineStore('houseListingStore', {
  state: () => ({
    houses: [] as House[], // List of houses
    loading: false, // Whether the houses are being loaded
    error: null as string | null // Error message if an error occurs
  }),
  actions: {
    // Action to fetch the list of houses from the API
    async fetchHouses() {
      this.loading = true

      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', HOUSE_LISTING_API_KEY)

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect
      }

      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', requestOptions)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const res = await response.json()
        console.log(res)

        this.houses = res
      } catch (error) {
        console.log('Error fetching houses:', error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    }
  }
})
