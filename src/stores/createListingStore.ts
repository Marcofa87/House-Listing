// stores/apartmentStore.ts
import { defineStore } from 'pinia'
import type { House } from '../types'

export const useApartmentStore = defineStore('apartment', {
  state: () => ({
    apartments: [] as House[]
  }),
  actions: {
    async fetchApartments() {
      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
          }
        })
        const data = await response.json()
        this.apartments = data
      } catch (error) {
        console.log('error', error)
      }
    },
    async createApartment(newApartment: House) {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg')

      const formdata = new FormData()
      formdata.append('price', newApartment.price.toString())
      formdata.append('bedrooms', newApartment.rooms.bedrooms.toString())
      formdata.append('bathrooms', newApartment.rooms.bathrooms.toString())
      formdata.append('size', newApartment.size.toString())
      formdata.append('streetName', newApartment.location.street)
      formdata.append('houseNumber', newApartment.location.houseNumber)
      if (newApartment.location.numberAddition)
        formdata.append('numberAddition', newApartment.location.numberAddition)
      formdata.append('zip', newApartment.location.zip)
      formdata.append('city', newApartment.location.city)
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
