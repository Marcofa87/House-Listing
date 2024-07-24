import { defineStore } from 'pinia'

export const useHouseStore = defineStore('house', {
  state: () => ({
    houses: [] as any[]
  }),
  actions: {
    async deleteHouse(houseId: string) {
      const myHeaders = new Headers()
      myHeaders.append('X-Api-Key', 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg')

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
        const result = await response.text()
        console.log('Casa eliminata con successo:', result)

        // Rimuovi la casa dallo state
        this.houses = this.houses.filter((house) => house.id !== houseId)

        return true
      } catch (error) {
        console.error("Errore durante l'eliminazione della casa:", error)
        return false
      }
    }
  }
})
