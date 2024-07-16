import { defineStore } from 'pinia'
import type { Apartment } from '../types'

export const useHouseDetailStore = defineStore('house', {
  state: () => ({
    house: null as Apartment | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchHouseDetails(id: number) {
      this.loading = true
      this.error = null
      try {
        console.log('Fetching house details for id:', id)
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch house details')
        }
        const result = await response.json()
        console.log('Fetched house details:', result)
        this.house = result[0]
      } catch (error) {
        console.error('Error fetching house details:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
