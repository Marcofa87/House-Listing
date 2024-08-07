import { defineStore } from 'pinia'
import type { House } from '@/types'
import { API_LISTING_KEY } from '@/config/envConfig'

export const useHouseListingStore = defineStore('houseListingStore', {
  state: () => ({
    houses: [] as House[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchHouses() {
      this.loading = true

      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', API_LISTING_KEY)

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
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
