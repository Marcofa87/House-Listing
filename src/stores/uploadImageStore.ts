import { defineStore } from 'pinia'
import { API_LISTING_KEY } from '@/config/envConfig'

// Interface for image upload state
interface ImageUploadState {
  isUploading: boolean // Whether an image is currently being uploaded
  lastUploadedImageUrl: string | null // URL of the last successfully uploaded image
}

export const useImageUploadStore = defineStore('imageUpload', {
  state: (): ImageUploadState => ({
    isUploading: false,
    lastUploadedImageUrl: null
  }),
  actions: {
    // Action to upload an image for a specific house
    async uploadHouseImage(houseId: string, file: File) {
      this.isUploading = true

      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', API_LISTING_KEY)

      const formData = new FormData()
      formData.append('image', file, file.name)

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow' as RequestRedirect
      }

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`,
          requestOptions
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const text = await response.text()

        // If the response is empty, assume the upload was successful
        if (!text) {
          console.log('Image upload successful, but received empty response')
          return { success: true }
        }

        const result = JSON.parse(text)
        console.log(result)

        if (result.imageUrl) {
          this.lastUploadedImageUrl = result.imageUrl
        }

        return result
      } catch (error) {
        console.error('Error uploading image:', error)
        throw error
      } finally {
        this.isUploading = false
      }
    }
  }
})
