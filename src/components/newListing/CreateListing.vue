<template>
  <div class="listing-container">
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
      <div class="form-button">
        <CustomButtons
          @click="submitForm"
          class="action-button"
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

<style src="@/assets/styles/shared-listing-styles.css" scoped></style>
