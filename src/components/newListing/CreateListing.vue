<!-- CreateListing.vue -->
<template>
  <div>
    <h1>Create New Listing</h1>
    <ListingForm
      title="Create New Listing"
      submitButtonText="Create Listing"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ListingForm from '@/shared/ListingForm.vue'
import { useApartmentStore } from '@/stores/createListingStore'
import { useImageUploadStore } from '@/stores/uploadImageStore'
import type { Apartment } from '@/types'

const router = useRouter()
const apartmentStore = useApartmentStore()
const imageUploadStore = useImageUploadStore()

const handleSubmit = async (formData: Partial<Apartment>) => {
  try {
    // Create the apartment listing
    const newApartment = await apartmentStore.createApartment(formData as Apartment)

    // If there's an image and the apartment was created successfully, upload it
    if (formData.image && newApartment?.id) {
      await imageUploadStore.uploadHouseImage(newApartment.id.toString(), formData.image)
    }

    // Redirect to the listing page or home page
    router.push('/')
  } catch (error) {
    console.error('Failed to create listing:', error)
    // Handle error (show message to user, etc.)
  }
}
</script>
