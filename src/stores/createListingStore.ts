import { defineStore } from 'pinia'
import type { Apartment } from '../types'

export const useApartmentStore = defineStore('apartment', {
  state: () => ({
    apartments: [] as Apartment[]
  }),
  actions: {
    async createApartment(newApartment: Apartment) {
      if (
        !newApartment.streetName ||
        !newApartment.houseNumber ||
        !newApartment.zip ||
        !newApartment.city ||
        !newApartment.price ||
        !newApartment.bedrooms ||
        !newApartment.bathrooms ||
        !newApartment.size ||
        !newApartment.constructionYear
      ) {
        console.error('Missing required fields')
        return
      }

      const formData = new FormData()
      formData.append('price', newApartment.price.toString())
      formData.append('size', newApartment.size.toString())
      formData.append('constructionYear', newApartment.constructionYear.toString())
      formData.append('hasGarage', newApartment.hasGarage.toString())
      formData.append('description', newApartment.description)
      formData.append('location[city]', newApartment.city)
      formData.append('location[houseNumber]', newApartment.houseNumber.toString())
      formData.append('location[houseNumberAddition]', newApartment.numberAddition || '')
      formData.append('location[street]', newApartment.streetName)
      formData.append('location[zip]', newApartment.zip)
      formData.append('rooms[bedrooms]', newApartment.bedrooms.toString())
      formData.append('rooms[bathrooms]', newApartment.bathrooms.toString())
      if (newApartment.imageURL) {
        formData.append('imageURL', newApartment.imageURL)
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
        },
        body: formData,
        redirect: 'follow'
      }

      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', requestOptions)
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! status: ${response.status}. ${errorText}`)
        }
        const result = await response.json()
        this.apartments.push(result)
      } catch (error) {
        console.log('Error creating apartment:', error)
      }
    }
  }
})
