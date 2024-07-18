const myHeaders = new Headers()
myHeaders.append('X-Api-Key', 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg')

// Definizione di FormData
const formdata = new FormData()
const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
if (fileInput && fileInput.files) {
  formdata.append('image', fileInput.files[0], 'pexels-photo-1311518.jpeg')
}

// Opzioni della richiesta
const requestOptions: RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
}

// Funzione per inviare la richiesta
const uploadImage = async () => {
  try {
    console.log('Invio della richiesta...')

    const response = await fetch(
      'https://api.intern.d-tt.nl/api/houses/:houseId/upload',
      requestOptions
    )

    console.log('Risposta ricevuta:', response)

    const result = await response.text()

    console.log('Risultato:', result)
  } catch (error) {
    console.error('Errore:', error)
  }
}

// E
