// src/stores/houseStore.js
import { defineStore } from 'pinia'

export const useHouseDetailStore = defineStore('house', {
  state: () => ({
    house: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchHouseDetails(id: number) {
      this.loading = true
      this.error = null
      try {
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
        this.house = result
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
