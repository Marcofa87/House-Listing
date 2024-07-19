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
        redirect: 'follow'
      }

      try {
        const response = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`,
          requestOptions
        )
        const result = await response.json()
        console.log(result)

        if (result.imageUrl) {
          this.lastUploadedImageUrl = result.imageUrl
        }

        return result
      } catch (error) {
        console.error('error', error)
        throw error
      } finally {
        this.isUploading = false
      }
    }
  }
})
