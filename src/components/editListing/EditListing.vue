<!-- EditListing.vue -->
<template>
  <div>
    <h1>Edit Listing</h1>
    <ListingForm
      v-if="house"
      title="Edit Listing"
      submitButtonText="Update Listing"
      :initialData="house"
      @submit="handleSubmit"
    />
    <p v-else-if="isLoading">Loading...</p>
    <p v-else>Failed to load listing</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ListingForm from '@/shared/ListingForm.vue'
import { useApartmentStore } from '@/stores/createListingStore'
import { useEditHouseStore } from '@/stores/editListingStore'
import { useImageUploadStore } from '@/stores/uploadImageStore'
import type { Apartment } from '@/types'

const router = useRouter()
const route = useRoute()
const apartmentStore = useApartmentStore()
const editHouseStore = useEditHouseStore()
const imageUploadStore = useImageUploadStore()

const house = ref<Apartment | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  await apartmentStore.fetchApartments()
  const houseId = route.params.id as string
  house.value = apartmentStore.apartments.find((h) => h.id === parseInt(houseId)) || null
  isLoading.value = false
})

const handleSubmit = async (formData: Partial<Apartment>) => {
  if (!house.value) return

  try {
    // Update the house listing
    await editHouseStore.editHouse(house.value.id.toString(), formData as Apartment)

    // If there's a new image, upload it
    if (formData.image && formData.image !== house.value.image) {
      await imageUploadStore.uploadHouseImage(house.value.id.toString(), formData.image)
    }

    // Redirect to the listing page or home page
    router.push('/')
  } catch (error) {
    console.error('Failed to update listing:', error)
    // Handle error (show message to user, etc.)
  }
}
</script>
