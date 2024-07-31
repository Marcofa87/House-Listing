<template>
  <div class="edit-listing-container">
    <div class="content-wrapper">
      <div class="listing-header">
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Edit Listing</h2>
      </div>

      <ApartmentForm :initial-data="editedHouse" @submit="submitForm" />

      <ImageUpload v-model:image="editedHouse.image" />

      <div class="edit-form-button">
        <CustomButtons @click="submitForm" class="edit-button">SAVE CHANGES</CustomButtons>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEditHouseStore } from '../../stores/editListingStore'
import { useImageUploadStore } from '../../stores/uploadImageStore'
import CustomButtons from '@/shared/CustomButtons.vue'
import ApartmentForm from '@/components/ApartmentForm.vue'
import ImageUpload from '@/components/ImageUpload.vue'

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

onMounted(async () => {
  const houseId = route.params.id as string
  await fetchHouseData(houseId)
})

const fetchHouseData = async (houseId: string) => {
  try {
    const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
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
      numberAddition: houseData.location.houseNumberAddition || '',
      zip: houseData.location.zip || '',
      city: houseData.location.city || '',
      price: houseData.price?.toString() || '',
      image: null,
      bedrooms: houseData.rooms.bedrooms?.toString() || '',
      bathrooms: houseData.rooms.bathrooms?.toString() || '',
      size: houseData.size?.toString() || '',
      constructionYear: houseData.constructionYear?.toString() || '',
      hasGarage: houseData.hasGarage?.toString() || 'false',
      description: houseData.description || ''
    }

    if (houseData.image) {
      // Set image preview if needed
    }
  } catch (error) {
    console.error('Error fetching house data:', error)
  }
}

const goBack = () => {
  router.go(-1)
}

const submitForm = async (formData) => {
  try {
    const houseId = route.params.id as string
    const result = await editHouseStore.editHouse(houseId, formData)

    if (formData.image) {
      await imageUploadStore.uploadHouseImage(houseId, formData.image)
    }

    router.push('/')
  } catch (error) {
    console.error('There was an error during editing of the listing:', error)
  }
}
</script>

<style scoped>
.edit-listing-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  background-image: url('@/assets/img_background@3x.png');
  background-size: cover;
  background-position: center 50%;
  background-attachment: fixed;
}

.content-wrapper {
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
}

.listing-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.listing-header .back {
  width: 32px;
  margin-bottom: 10px;
  cursor: pointer;
}

.listing-header h2 {
  text-align: center;
  width: 80%;
}

.edit-listing-container .content-wrapper .edit-button {
  width: 80%;
}

.edit-form-button {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .edit-listing-container {
    justify-content: flex-start;
    padding-left: 150px;
  }

  .content-wrapper {
    margin: 0;
  }
}
</style>
