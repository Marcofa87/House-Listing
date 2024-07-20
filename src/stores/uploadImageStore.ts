<<<<<<< HEAD
import { defineStore } from 'pinia'

interface UploadState {
  imagePreview: string | null
  uploadStatus: 'idle' | 'loading' | 'success' | 'error'
}

export const useUploadImageStore = defineStore('upload', {
  state: (): UploadState => ({
    imagePreview: null,
    uploadStatus: 'idle'
  }),
  actions: {
    async uploadImage(file: File) {
      const formData = new FormData()
      formData.append('image', file) // Assicurati che 'image' sia il nome corretto per il parametro

      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses/upload', {
          method: 'POST',
          headers: {
            'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
          },
          body: formData
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Upload failed: ${response.status} ${response.statusText}. ${errorText}`)
        }

        const result = await response.json()
        this.uploadStatus = 'success'
        return result.imageURL // Assumendo che l'URL dell'immagine venga restituito così
      } catch (error) {
        console.error('Error:', error)
        this.uploadStatus = 'error'
        throw error
      }
    },
    setImagePreview(preview: string) {
      this.imagePreview = preview
=======
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
>>>>>>> main
    }
  }
})
