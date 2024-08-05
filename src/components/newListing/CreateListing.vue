<template>
  <ListingForm
    title="Create New Listing"
    submitButtonText="POST"
    :initialFormData="newApartment"
    @submit="submitForm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApartmentStore } from '@/stores/createListingStore'
import { useImageUploadStore } from '@/stores/uploadImageStore'
import ListingForm from '@/shared/ListingForm.vue'

const router = useRouter()
const apartmentStore = useApartmentStore()
const imageUploadStore = useImageUploadStore()

const newApartment = ref({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  price: 0,
  image: null as File | null,
  bedrooms: 0,
  bathrooms: 0,
  size: 0,
  constructionYear: 0,
  hasGarage: false,
  description: ''
})

const submitForm = async (formData) => {
  try {
    const createdApartment = await apartmentStore.createApartment(formData)

    if (!createdApartment || !createdApartment.id) {
      throw new Error('Failed to create apartment: No ID returned')
    }

    if (formData.image && createdApartment.id) {
      await imageUploadStore.uploadHouseImage(createdApartment.id.toString(), formData.image)
    }

    router.push('/')
  } catch (error) {
    console.error('There was an error during creation of the announce:', error)
  }
}
</script>
