<template>
  <div class="create-listing-container">
    <div class="content-wrapper">
      <!-- Header for the listing creation form -->
      <div class="listing-header">
        <!-- Back button to navigate to the previous page -->
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Create New Listing</h2>
      </div>

      <!-- Form to create a new listing -->
      <form @submit.prevent="submitForm">
        <!-- Input for street name -->
        <FormInput
          id="streetName"
          label="Street name"
          v-model="newApartment.streetName"
          placeholder="Enter the street name"
          required
        />

        <!-- Row for house number and number addition -->
        <div class="form-row">
          <FormInput
            id="houseNumber"
            label="House Number"
            v-model="newApartment.houseNumber"
            placeholder="Enter house number"
            required
          />
          <FormInput
            id="numberAddition"
            label="Number Addition"
            v-model="newApartment.numberAddition"
            placeholder="e.g. A"
          />
        </div>

        <!-- Input for postal code and city -->
        <FormInput
          id="zip"
          label="Postal Code"
          v-model="newApartment.zip"
          placeholder="e.g. 1000 AA"
          required
        />

        <FormInput
          id="city"
          label="City"
          v-model="newApartment.city"
          placeholder="e.g. Utrecht"
          required
        />

        <!-- Section for image upload -->
        <div class="form-group">
          <label for="image">Upload Picture (PNG or JPG)*</label>
          <input
            type="file"
            ref="fileInput"
            @change="handleImageUpload"
            accept="image/png, image/jpeg"
            required
            style="display: none"
          />
          <div class="upload-label" @click="triggerFileInput">
            <!-- Show upload icon or image preview -->
            <img v-if="!imagePreview" src="../../assets/ic_upload@3x.png" alt="Upload" />
            <div v-else class="image-container">
              <img :src="imagePreview" alt="Preview" class="image-preview" />
              <div class="remove-image" @click.stop="removeImage">×</div>
            </div>
          </div>
        </div>

        <!-- Inputs for price, size, and garage -->
        <FormInput
          id="price"
          label="Price"
          v-model.number="newApartment.price"
          type="text"
          placeholder="e.g. €150.000"
          required
        />

        <div class="form-row">
          <FormInput
            id="size"
            label="Size"
            v-model.number="newApartment.size"
            type="text"
            placeholder="e.g. 60m2"
            required
          />
          <div class="form-group">
            <label for="hasGarage">Garage*</label>
            <select v-model="newApartment.hasGarage" id="hasGarage" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
        </div>

        <!-- Inputs for bedrooms, bathrooms, and construction year -->
        <div class="form-row">
          <FormInput
            id="bedrooms"
            label="Bedrooms"
            v-model.number="newApartment.bedrooms"
            type="text"
            placeholder="Number of bedrooms"
            required
          />
          <FormInput
            id="bathrooms"
            label="Bathrooms"
            v-model.number="newApartment.bathrooms"
            type="text"
            placeholder="Number of bathrooms"
            required
          />
        </div>

        <FormInput
          id="constructionYear"
          label="Construction Year"
          v-model.number="newApartment.constructionYear"
          type="text"
          placeholder="Construction year"
          required
        />

        <!-- Input for description -->
        <div class="form-group">
          <label for="description">Description*</label>
          <textarea
            id="description"
            v-model="newApartment.description"
            placeholder="Description"
            :class="{ 'error-border': isSubmitted && !newApartment.description }"
            required
          ></textarea>
          <p v-if="isSubmitted && !isValid" class="error-message">Required field missing</p>
        </div>
      </form>

      <!-- Button to submit the form -->
      <div class="post-form-button">
        <CustomButtons
          @click="submitForm"
          class="post-button"
          :disabled="!isValid"
          :class="{ 'disabled-button': !isValid }"
          >POST</CustomButtons
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApartmentStore } from '@/stores/createListingStore'
import { useImageUploadStore } from '@/stores/uploadImageStore'
import { useRouter } from 'vue-router'
import CustomButtons from '@/shared/CustomButtons.vue'
import FormInput from '@/shared/FormInput.vue'

// Router for navigation
const router = useRouter()
const goBack = () => router.go(-1)

// Store for apartment data
const apartmentStore = useApartmentStore()
const imageUploadStore = useImageUploadStore()

const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const isSubmitted = ref(false)

// Data for the new apartment listing
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

// Validation computed property
const isValid = computed(() => {
  return (
    newApartment.value.streetName &&
    newApartment.value.houseNumber &&
    newApartment.value.zip &&
    newApartment.value.city &&
    newApartment.value.price > 0 &&
    newApartment.value.bedrooms > 0 &&
    newApartment.value.bathrooms > 0 &&
    newApartment.value.size > 0 &&
    newApartment.value.constructionYear > 0 &&
    newApartment.value.description
  )
})

// Submit form handler
const submitForm = async () => {
  isSubmitted.value = true

  if (!isValid.value) return

  try {
    const createdApartment = await apartmentStore.createApartment(newApartment.value)

    if (!createdApartment || !createdApartment.id) {
      throw new Error('Failed to create apartment: No ID returned')
    }

    if (newApartment.value.image && createdApartment.id) {
      await imageUploadStore.uploadHouseImage(
        createdApartment.id.toString(),
        newApartment.value.image
      )
    } else {
      console.error('Missing image or apartment ID')
    }

    // Reset form fields
    newApartment.value = {
      streetName: '',
      houseNumber: '',
      numberAddition: '',
      zip: '',
      city: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      size: 0,
      constructionYear: 0,
      hasGarage: false,
      description: '',
      image: null
    }
    imagePreview.value = null
    isSubmitted.value = false

    router.push('/')
  } catch (error) {
    console.error('There was an error during creation of the announce:', error)
  }
}

// Handle image upload and preview
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!(target.files && target.files.length > 0)) {
    return
  }
  const file = target.files[0]
  newApartment.value.image = file

  // Create image preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// Remove selected image
const removeImage = () => {
  newApartment.value.image = null
  imagePreview.value = null
}

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click()
}
</script>

<style scoped>
/* Main container styles: full width, flex layout, background image, and fixed positioning */
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

/* Wrapper for content, with a max width, padding, and centered alignment */
.content-wrapper {
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
}

/* Header section with flex alignment and spacing for back button and title */
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

/* Image upload area with dashed border, centered content, and click-to-upload functionality */
.upload-label {
  border: 3px grey dashed;
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.upload-label img {
  object-fit: cover;
}

/* Image preview container with absolute positioning for the remove button */
.image-container {
  position: relative;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}

.remove-image {
  position: absolute;
  top: -15px;
  right: 0;
  transform: translate(50%, -50%);
  width: 25px;
  height: 25px;
  background-color: rgb(255, 255, 255);
  color: rgb(153, 153, 153);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 10;
}

/* Header text alignment */
.listing-header h2 {
  text-align: center;
  width: 80%;
}

/* Form group and row layout with spacing */
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

/* General form element styling with padding, border, and font size */
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
  border: 1px solid #ccc;
  border-radius: 12px;
}

input,
select {
  height: 50px;
}

textarea {
  height: 100px;
  resize: vertical;
}

/* Error styling for form fields and messages */
.error-border {
  border: 2px solid red;
}

.error-message {
  color: red;
}

/* Post button styling and disabled state */
.create-listing-container .content-wrapper .post-button {
  width: 80%;
}

.disabled-button {
  background-color: #d3d3d3;
  cursor: not-allowed;
  opacity: 0.5;
}

.disabled-button:focus {
  outline: none;
}

.post-form-button {
  display: flex;
  justify-content: center;
}

.post-form-button .post-button {
  width: 80%;
}

/* Responsive adjustments for larger screens */
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
