import { defineStore } from 'pinia'
import type { House } from '../types'

const HOUSE_LISTING_API_KEY = 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'

export const useHouseDetailStore = defineStore('house', {
  state: () => ({
    house: null as House | null, // Details of a specific house
    loading: false, // Whether the details are being loaded
    error: null as string | null // Error message if an error occurs
  }),
  actions: {
    // Action to fetch details of a specific house by ID
    async fetchHouseDetails(id: number) {
      this.loading = true
      this.error = null
      try {
        console.log('Fetching house details for id:', id)
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': HOUSE_LISTING_API_KEY
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch house details')
        }
        const result = await response.json()
        console.log('Fetched house details:', result)
        this.house = result[0] // Assuming the result is an array with a single house
      } catch (error) {
        const err = error as Error
        console.error('Error fetching house details:', error)
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
