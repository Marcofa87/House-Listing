import { defineStore } from 'pinia'
import type { Apartment } from '../types'

const VUE_LISTING_API = import.meta.env.VITE_LISTING_API_KEY

export const useApartmentStore = defineStore('apartment', {
  state: () => ({
    apartments: [] as Apartment[]
  }),
  actions: {
    async fetchApartments() {
      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            'X-Api-Key': VUE_LISTING_API
          }
        })
        const data = await response.json()
        this.apartments = data
      } catch (error) {
        console.log('error', error)
      }
    },
    async createApartment(newApartment: Apartment) {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', VUE_LISTING_API)

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
        this.apartments.push(result)
        return result
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
