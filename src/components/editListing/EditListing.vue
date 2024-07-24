<template>
  <div class="edit-listing-container">
    <div class="content-wrapper">
      <div class="listing-header">
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Edit Listing</h2>
      </div>

      <form @submit.prevent="submitForm">
        <FormInput
          id="streetName"
          label="Street name"
          v-model="editedHouse.streetName"
          placeholder="Enter street name"
          required
        />

        <div class="form-row">
          <FormInput
            id="houseNumber"
            label="House Number"
            v-model="editedHouse.houseNumber"
            placeholder="Enter house number"
            required
          />
          <FormInput
            id="numberAddition"
            label="Number Addition"
            v-model="editedHouse.numberAddition"
            placeholder="e.g. A"
          />
        </div>

        <FormInput
          id="zip"
          label="Postal Code"
          v-model="editedHouse.zip"
          placeholder="e.g. 1000 AA"
          required
        />

        <FormInput
          id="city"
          label="City"
          v-model="editedHouse.city"
          placeholder="e.g. Utrecht"
          required
        />

        <div class="form-group">
          <label for="image">Upload Picture (PNG or JPG)</label>
          <input
            type="file"
            id="image"
            ref="fileInput"
            @change="handleImageUpload"
            accept="image/png, image/jpeg"
            style="display: none"
          />
          <div class="upload-label" @click="$refs.fileInput.click()">
            <img v-if="!imagePreview" src="../../assets/ic_upload@3x.png" alt="Upload" />
            <img v-else :src="imagePreview" alt="Preview" class="image-preview" />
          </div>
        </div>

        <FormInput
          id="price"
          label="Price"
          v-model="editedHouse.price"
          type="text"
          placeholder="e.g. €150.000"
          required
        />

        <div class="form-row">
          <FormInput
            id="size"
            label="Size"
            v-model="editedHouse.size"
            type="text"
            placeholder="e.g. 60m2"
            required
          />
          <div class="form-group">
            <label for="hasGarage">Garage*</label>
            <select v-model="editedHouse.hasGarage" id="hasGarage" required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <FormInput
            id="bedrooms"
            label="Bedrooms"
            v-model="editedHouse.bedrooms"
            type="text"
            placeholder="Number of bedrooms"
            required
          />
          <FormInput
            id="bathrooms"
            label="Bathrooms"
            v-model="editedHouse.bathrooms"
            type="text"
            placeholder="Number of bathrooms"
            required
          />
        </div>

        <FormInput
          id="constructionYear"
          label="Construction Year"
          v-model="editedHouse.constructionYear"
          type="number"
          placeholder="Construction year"
          required
        />

        <FormInput
          id="description"
          label="Description"
          v-model="editedHouse.description"
          type="textarea"
          placeholder="Description"
          required
        />
      </form>
      <div class="edit-form-button">
        <CustomButtons @click="submitForm" class="edit-button">SAVE CHANGES</CustomButtons>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEditHouseStore } from '../../stores/editListingStore'

import { useImageUploadStore } from '../../stores/uploadImageStore'
import { useRouter, useRoute } from 'vue-router'
import CustomButtons from '@/shared/CustomButtons.vue'
import FormInput from '@/shared/FormInput.vue'

const router = useRouter()
const route = useRoute()
const editHouseStore = useEditHouseStore()
const imageUploadStore = useImageUploadStore()

const imagePreview = ref<string | null>(null)

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
        'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const houseData = data[0]
    console.log(houseData)

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

    console.log('Dati recuperati:', editedHouse.value)
    if (houseData.image) {
      imagePreview.value = houseData.image
    }

    console.log('Dati mappati:', editedHouse.value)
  } catch (error) {
    console.error('Error fetching house data:', error)
  }
}

console.log(editedHouse)

onMounted(async () => {
  const houseId = route.params.id as string
  await fetchHouseData(houseId)
})

const goBack = () => {
  router.go(-1)
}

const submitForm = async () => {
  try {
    validateForm()
    const houseId = route.params.id as string
    console.log('Submitting form for house ID:', houseId)
    console.log('Form data:', editedHouse.value)

    const result = await editHouseStore.editHouse(houseId, editedHouse.value)
    console.log('Edit result:', result)

    if (editedHouse.value.image) {
      console.log('Uploading image...')
      await imageUploadStore.uploadHouseImage(houseId, editedHouse.value.image)
    }

    router.push('/')
  } catch (error) {
    console.error('There was an error during editing of the listing:', error)
  }
}

const validateForm = () => {
  const requiredFields = [
    'streetName',
    'houseNumber',
    'zip',
    'city',
    'price',
    'size',
    'bedrooms',
    'bathrooms',
    'constructionYear'
  ]
  for (const field of requiredFields) {
    if (!editedHouse.value[field]) {
      throw new Error(`Field ${field} is required`)
    }
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    editedHouse.value.image = file

    // Create image preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
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

.upload-label {
  border: 3px grey dashed;
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.upload-label img {
  object-fit: cover;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}

.listing-header h2 {
  text-align: center;
  width: 80%;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: lighter;
}

input,
select,
textarea {
  width: 100%;
  padding: 15px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.create-listing-container .content-wrapper .post-button {
  width: 80%;
}

.post-form-button {
  display: flex;
  justify-content: center;
}
</style>
