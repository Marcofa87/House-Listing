import { defineStore } from 'pinia'
import type { House } from '@/types'

export const useHouseListingStore = defineStore('houseListingStore', {
  state: () => ({
    houses: [] as House[],
    loading: false,
    error: null as string | null
  }),
  getters: {},
  actions: {
    async fetchHouses() {
      this.loading = true

      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg')

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'no-cors'
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
        console.log('error', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
