import { defineStore } from 'pinia'
import type { EditHouseState, HouseData } from '../types'

import { API_LISTING_KEY } from '@/config/envConfig'

if (!API_LISTING_KEY) throw new Error('API key is not defined in the environment variables')

export const useEditHouseStore = defineStore('editHouse', {
  state: (): EditHouseState => ({
    isLoading: false, // Whether the edit action is in progress
    error: null // Error message if an error occurs
  }),

  actions: {
    // Action to edit a house by ID
    async editHouse(houseId: string, houseData: HouseData) {
      this.isLoading = true
      this.error = null

      // Prepare form data for the update
      const formData = new FormData()
      Object.entries(houseData).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Convert `FormData` to a plain object for debugging
      const formDataObject: Record<string, any> = {}
      formData.forEach((value, key) => {
        formDataObject[key] = value
      })
      console.log('Sending data:', formDataObject)

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'X-Api-Key': API_LISTING_KEY
        },
        body: formData,
        redirect: 'follow' as RequestRedirect
      }

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${houseId}`,
          requestOptions
        )

        // Convert response headers to an object for debugging
        const headersObject: Record<string, string> = {}
        response.headers.forEach((value, key) => {
          headersObject[key] = value
        })
        console.log('Response status:', response.status)
        console.log('Response headers:', headersObject)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const text = await response.text()
        console.log('Raw response:', text)

        if (text) {
          try {
            return JSON.parse(text)
          } catch (e) {
            console.warn('Response is not JSON:', text)
            return text
          }
        } else {
          console.warn('Empty response received')
          return null
        }
      } catch (error) {
        console.error('Error editing house:', error)
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
