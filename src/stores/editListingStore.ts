// editListingStore.ts

import { defineStore } from 'pinia'

interface HouseData {
  price: string
  bedrooms: string
  bathrooms: string
  size: string
  streetName: string
  houseNumber: string
  numberAddition: string
  zip: string
  city: string
  constructionYear: string
  hasGarage: string
  description: string
}

interface EditHouseState {
  isLoading: boolean
  error: string | null
}

export const useEditHouseStore = defineStore('editHouse', {
  state: (): EditHouseState => ({
    isLoading: false,
    error: null
  }),

  actions: {
    async editHouse(houseId: string, houseData: HouseData) {
      this.isLoading = true
      this.error = null

      const formData = new FormData()
      Object.entries(houseData).forEach(([key, value]) => {
        formData.append(key, value)
      })

      console.log('Sending data:', Object.fromEntries(formData))

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
        },
        body: formData,
        redirect: 'follow' as RequestRedirect
      }

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${houseId}`,
          requestOptions
        )

        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const text = await response.text()
        console.log('Raw response:', text)

        let result
        if (text) {
          try {
            result = JSON.parse(text)
          } catch (e) {
            console.warn('Response is not JSON:', text)
            result = text
          }
        } else {
          console.warn('Empty response received')
          result = null
        }

        return result
      } catch (error) {
        console.error('Error in editHouse:', error)
        if (error instanceof Error) {
          this.error = error.message || 'An error occurred while editing the house.'
        } else {
          this.error = 'An unexpected error occurred.'
        }
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
