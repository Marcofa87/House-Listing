import { defineStore } from 'pinia'
import type { Apartment } from '../types'
import { API_LISTING_KEY } from '@/config/envConfig'

export const useApartmentStore = defineStore('apartment', {
  state: () => ({
    // State to hold the list of apartments
    apartments: [] as Apartment[]
  }),
  actions: {
    // Action to fetch apartments from the API
    async fetchApartments() {
      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            'X-Api-Key': API_LISTING_KEY
          }
        })
        const data = await response.json()
        this.apartments = data
      } catch (error) {
        console.log('Error fetching apartments:', error)
      }
    },
    // Action to create a new apartment and add it to the list
    async createApartment(newApartment: Apartment) {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', API_LISTING_KEY)

      // Prepare form data for the new apartment
      const formdata = new FormData()
      formdata.append('price', newApartment.price.toString())
      formdata.append('bedrooms', newApartment.bedrooms.toString())
      formdata.append('bathrooms', newApartment.bathrooms.toString())
      formdata.append('size', newApartment.size.toString())
      formdata.append('streetName', newApartment.streetName)
      formdata.append('houseNumber', newApartment.houseNumber)
      if (newApartment.numberAddition)
        formdata.append('numberAddition', newApartment.numberAddition)
      formdata.append('zip', newApartment.zip)
      formdata.append('city', newApartment.city)
      formdata.append('constructionYear', newApartment.constructionYear.toString())
      formdata.append('hasGarage', newApartment.hasGarage.toString())
      formdata.append('description', newApartment.description)

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow' as RequestRedirect
      }

      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', requestOptions)
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result = await response.json()
        this.apartments.push(result) // Add new apartment to the list
        return result
      } catch (error) {
        console.log('Error creating apartment:', error)
      }
    }
  }
})
