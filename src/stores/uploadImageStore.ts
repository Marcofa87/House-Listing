// imageUploadStore.ts
import { defineStore } from 'pinia'

interface ImageUploadState {
  isUploading: boolean
  lastUploadedImageUrl: string | null
}

export const useImageUploadStore = defineStore('imageUpload', {
  state: (): ImageUploadState => ({
    isUploading: false,
    lastUploadedImageUrl: null
  }),
  actions: {
    async uploadHouseImage(houseId: string, file: File) {
      this.isUploading = true

      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg')

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

        // Se la risposta è vuota, assumiamo che l'upload sia andato a buon fine
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
