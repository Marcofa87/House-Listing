import { defineStore } from 'pinia'

const VUE_LISTING_API = import.meta.env.VITE_LISTING_API_KEY

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
    houses: [] as House[]
  }),
  actions: {
    async fetchHouses() {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', VUE_LISTING_API)

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
        console.error('Errore durante il recupero delle case:', error)
        throw error
      }
    },
    async deleteHouse(houseId: string) {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', VUE_LISTING_API)

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

        this.houses = this.houses.filter((house) => house.id !== houseId)
        console.log('Casa eliminata con successo')
        return true
      } catch (error) {
        console.error("Errore durante l'eliminazione della casa:", error)
        throw error
      }
    }
  }
})
