<template>
  <div class="create-listing-container">
    <div class="content-wrapper">
      <div class="listing-header">
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Create New Listing</h2>
      </div>

      <ApartmentForm :initial-data="newApartment" @submit="submitForm" />

      <ImageUpload v-model:image="newApartment.image" />

      <div class="post-form-button">
        <CustomButtons @click="submitForm" class="post-button">POST</CustomButtons>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApartmentStore } from '../../stores/createListingStore'
import { useImageUploadStore } from '../../stores/uploadImageStore'
import CustomButtons from '@/shared/CustomButtons.vue'
import ApartmentForm from '@/shared/ApartmentForm.vue'
import ImageUpload from '@/shared/ImageUpload.vue'

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

const goBack = () => {
  router.go(-1)
}

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

<style scoped>
.create-listing-container {
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

.create-listing-container .content-wrapper .post-button {
  width: 80%;
}

.post-form-button {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .create-listing-container {
    justify-content: flex-start;
    padding-left: 150px;
  }

  .content-wrapper {
    margin: 0;
  }
}
</style>
