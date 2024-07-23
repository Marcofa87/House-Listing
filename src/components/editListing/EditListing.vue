<template>
  <div class="create-listing-container">
    <div class="content-wrapper">
      <div class="listing-header">
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Edit Listing</h2>
      </div>

      <form @submit.prevent="submitForm">
        <FormInput
          id="streetName"
          label="Title of listing"
          v-model="editedApartment.streetName"
          :placeholder="originalApartmentData.streetName"
          required
        />

        <div class="form-row">
          <FormInput
            id="houseNumber"
            label="House Number"
            v-model="editedApartment.houseNumber"
            :placeholder="originalApartmentData.houseNumber"
            required
          />
          <FormInput
            id="numberAddition"
            label="Number Addition"
            v-model="editedApartment.numberAddition"
            :placeholder="originalApartmentData.numberAddition"
          />
        </div>

        <FormInput
          id="zip"
          label="Postal Code"
          v-model="editedApartment.zip"
          :placeholder="originalApartmentData.zip"
          required
        />

        <FormInput
          id="city"
          label="City"
          v-model="editedApartment.city"
          :placeholder="originalApartmentData.city"
          required
        />

        <div class="form-group">
          <label for="image">Upload Picture (PNG or JPG)*</label>
          <input
            type="file"
            id="image"
            ref="fileInput"
            @change="handleImageUpload"
            accept="image/png, image/jpeg"
            style="display: none"
          />
          <div class="upload-label" @click="$refs.fileInput.click()">
            <img
              v-if="!imagePreview && !editedApartment.image"
              src="../../assets/ic_upload@3x.png"
              alt="Upload"
            />
            <img v-else-if="imagePreview" :src="imagePreview" alt="Preview" class="image-preview" />
            <img v-else :src="editedApartment.image" alt="Current image" class="image-preview" />
          </div>
        </div>

        <FormInput
          id="price"
          label="Price"
          v-model.number="editedApartment.price"
          type="text"
          :placeholder="
            originalApartmentData.price ? `€${originalApartmentData.price}` : 'e.g. €150.000'
          "
          required
        />

        <div class="form-row">
          <FormInput
            id="size"
            label="Size"
            v-model.number="editedApartment.size"
            type="text"
            :placeholder="
              originalApartmentData.size ? `${originalApartmentData.size}m2` : 'e.g. 60m2'
            "
            required
          />
          <div class="form-group">
            <label for="hasGarage">Garage*</label>
            <select v-model="editedApartment.hasGarage" id="hasGarage" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <FormInput
            id="bedrooms"
            label="Bedrooms"
            v-model.number="editedApartment.bedrooms"
            type="text"
            :placeholder="
              originalApartmentData.bedrooms
                ? originalApartmentData.bedrooms.toString()
                : 'Number of bedrooms'
            "
            required
          />
          <FormInput
            id="bathrooms"
            label="Bathrooms"
            v-model.number="editedApartment.bathrooms"
            type="text"
            :placeholder="
              originalApartmentData.bathrooms
                ? originalApartmentData.bathrooms.toString()
                : 'Number of bathrooms'
            "
            required
          />
        </div>

        <FormInput
          id="constructionYear"
          label="Construction Year"
          v-model.number="editedApartment.constructionYear"
          type="number"
          :placeholder="
            originalApartmentData.constructionYear
              ? originalApartmentData.constructionYear.toString()
              : 'Construction year'
          "
          required
        />

        <FormInput
          id="description"
          label="Description"
          v-model="editedApartment.description"
          type="textarea"
          :placeholder="originalApartmentData.description || 'Description'"
          required
        />
      </form>
      <div class="post-form-button">
        <CustomButtons @click="submitForm" class="post-button">SAVE</CustomButtons>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEditHouseStore } from '../../stores/editListingStore'
import { useImageUploadStore } from '../../stores/uploadImageStore'
import { useRoute, useRouter } from 'vue-router'
import CustomButtons from '@/shared/CustomButtons.vue'
import FormInput from '@/shared/FormInput.vue'

const router = useRouter()
const route = useRoute()

const editHouseStore = useEditHouseStore()
const imageUploadStore = useImageUploadStore()

const imagePreview = ref<string | null>(null)

const editedApartment = ref({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  price: 0,
  image: null as string | null,
  bedrooms: 0,
  bathrooms: 0,
  size: 0,
  constructionYear: 0,
  hasGarage: false,
  description: ''
})

const originalApartmentData = ref({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  price: 0,
  image: null as string | null,
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

onMounted(async () => {
  const houseId = route.params.id as string
  try {
    const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
      headers: {
        'X-Api-Key': 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'
      }
    })
    const houseData = await response.json()

    console.log('Raw house data:', houseData)

    const data = {
      streetName: houseData?.location?.street ?? '',
      houseNumber: houseData?.location?.houseNumber?.toString() ?? '',
      numberAddition: houseData?.location?.houseNumberAddition ?? '',
      zip: houseData?.location?.zip ?? '',
      city: houseData?.location?.city ?? '',
      price: houseData?.price ?? 0,
      image: houseData?.image ?? null,
      bedrooms: houseData?.rooms?.bedrooms ?? 0,
      bathrooms: houseData?.rooms?.bathrooms ?? 0,
      size: houseData?.size ?? 0,
      constructionYear: houseData?.constructionYear ?? 0,
      hasGarage: houseData?.hasGarage ?? false,
      description: houseData?.description ?? ''
    }

    editedApartment.value = { ...data }
    originalApartmentData.value = { ...data }

    if (houseData?.image) {
      imagePreview.value = houseData.image
    }

    console.log('Processed apartment data:', editedApartment.value)
  } catch (error) {
    console.error('Error fetching house data:', error)
  }
})

const submitForm = async () => {
  console.log('Submitting form with data:', editedApartment.value)
  try {
    const houseId = route.params.id as string
    const updatedHouse = await editHouseStore.editHouse(houseId, editedApartment.value)

    if (editedApartment.value.image && typeof editedApartment.value.image !== 'string') {
      await imageUploadStore.uploadHouseImage(houseId, editedApartment.value.image)
    }

    router.push('/')
  } catch (error) {
    console.error('There was an error during editing of the announce:', error)
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    editedApartment.value.image = file

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
