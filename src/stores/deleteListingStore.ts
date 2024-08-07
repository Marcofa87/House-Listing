import { defineStore } from 'pinia'
import { API_LISTING_KEY } from '@/config/envConfig'

// Interface for a house object
interface House {
  id: string
  location: {
    street: string
    city: string
    zip: string
  }
  price: number
  rooms: {
    bedrooms: number
    bathrooms: number
  }
  size: number
  image: string
  madeByMe: boolean
}

export const useDeleteListingStore = defineStore('deleteListing', {
  state: () => ({
    // State to hold the list of houses
    houses: [] as House[]
  }),
  actions: {
    // Action to fetch the list of houses from the API
    async fetchHouses() {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', API_LISTING_KEY)

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
        const data = await response.json()
        this.houses = data
      } catch (error) {
        console.error('Error fetching houses:', error)
        throw error
      }
    },
    // Action to delete a house by ID
    async deleteHouse(houseId: string) {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', API_LISTING_KEY)

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect
      }

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${houseId}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Remove the deleted house from the state
        this.houses = this.houses.filter((house) => house.id !== houseId)
        console.log('House deleted successfully')
        return true
      } catch (error) {
        console.error('Error deleting house:', error)
        throw error
      }
    }
  }
})
