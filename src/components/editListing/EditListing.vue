<template>
  <ListingForm
    title="Edit Listing"
    submitButtonText="SAVE CHANGES"
    :initialFormData="editedHouse"
    @submit="submitForm"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEditHouseStore } from '@/stores/editListingStore'
import { useImageUploadStore } from '@/stores/uploadImageStore'
import ListingForm from '@/shared/ListingForm.vue'
import { HouseData } from '@/types'

const HOUSE_LISTING_API_KEY = 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'

const router = useRouter()
const route = useRoute()
const editHouseStore = useEditHouseStore()
const imageUploadStore = useImageUploadStore()

const editedHouse = ref({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  price: '',
  image: null as File | null,
  bedrooms: '',
  bathrooms: '',
  size: '',
  constructionYear: '',
  hasGarage: 'false',
  description: ''
})

const fetchHouseData = async (houseId: string) => {
  try {
    const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': HOUSE_LISTING_API_KEY
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const houseData = data[0]

    editedHouse.value = {
      streetName: houseData.location.street || '',
      houseNumber: houseData.location.houseNumber?.toString() || '',
      numberAddition: houseData.location.numberAddition || '',
      zip: houseData.location.zip || '',
      city: houseData.location.city || '',
      price: houseData.price || '',
      image: houseData.image ? new File([], houseData.image) : null,
      bedrooms: houseData.bedrooms?.toString() || '',
      bathrooms: houseData.bathrooms?.toString() || '',
      size: houseData.size?.toString() || '',
      constructionYear: houseData.constructionYear?.toString() || '',
      hasGarage: houseData.hasGarage || 'false',
      description: houseData.description || ''
    }

    console.log('Fetched house data:', editedHouse.value)
  } catch (error) {
    console.error('Error fetching house data:', error)
  }
}

onMounted(() => {
  const houseId = route.params.id as string
  fetchHouseData(houseId)
})

const submitForm = async (formData: HouseData) => {
  try {
    const houseId = route.params.id as string
    console.log('Submitting form for house ID:', houseId)
    console.log('Form data:', formData)

    const result = await editHouseStore.editHouse(houseId, formData)
    console.log('Edit result:', result)

    if (formData.image) {
      console.log('Uploading image...')
      await imageUploadStore.uploadHouseImage(houseId, formData.image)
    }

    router.push('/')
  } catch (error) {
    console.error('There was an error during editing of the listing:', error)
  }
}
</script>
