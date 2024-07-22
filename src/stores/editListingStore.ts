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

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
        },
        body: formData,
        redirect: 'follow'
      }

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${houseId}`,
          requestOptions
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        return result
      } catch (error) {
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
