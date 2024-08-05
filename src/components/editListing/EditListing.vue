<template>
  <div class="edit-listing-container">
    <!-- Container for the whole editing form -->
    <div class="content-wrapper">
      <!-- Header for the edit form with back button and title -->
      <div class="listing-header">
        <!-- Back button to return to the previous page -->
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Edit Listing</h2>
      </div>

      <!-- Form to edit the house details -->
      <form @submit.prevent="submitForm">
        <!-- Input field for street name -->
        <FormInput
          id="streetName"
          label="Street name"
          v-model="editedHouse.streetName"
          placeholder="Enter street name"
          required
        />

        <!-- Row for house number and optional number addition -->
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

        <!-- Input field for postal code -->
        <FormInput
          id="zip"
          label="Postal Code"
          v-model="editedHouse.zip"
          placeholder="e.g. 1000 AA"
          required
        />

        <!-- Input field for city -->
        <FormInput
          id="city"
          label="City"
          v-model="editedHouse.city"
          placeholder="e.g. Utrecht"
          required
        />

        <!-- File upload input for the house image -->
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
          <!-- Label for file input with image preview or upload icon -->
          <div class="upload-label" @click="triggerFileInput">
            <img v-if="!imagePreview" src="../../assets/ic_upload@3x.png" alt="Upload" />
            <div v-else class="image-container">
              <img :src="imagePreview" alt="Preview" class="image-preview" />
              <div class="remove-image" @click.stop="removeImage">×</div>
            </div>
          </div>
        </div>

        <!-- Input field for price -->
        <FormInput
          id="price"
          label="Price"
          v-model="editedHouse.price"
          type="text"
          placeholder="e.g. €150.000"
          required
        />

        <!-- Row for size and garage information -->
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

        <!-- Row for bedrooms and bathrooms -->
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

        <!-- Input field for construction year -->
        <FormInput
          id="constructionYear"
          label="Construction Year"
          v-model="editedHouse.constructionYear"
          type="text"
          placeholder="Construction year"
          required
        />

        <!-- Textarea for description with validation error display -->
        <div class="form-group">
          <label for="description">Description*</label>
          <textarea
            id="description"
            v-model="editedHouse.description"
            placeholder="Description"
            :class="{ 'error-border': isSubmitted && !editedHouse.description }"
            required
          ></textarea>
          <p v-if="isSubmitted && !isValid" class="error-message">Required field missing</p>
        </div>
      </form>
      <!-- Button to save changes -->
      <div class="edit-form-button">
        <CustomButtons
          @click="submitForm"
          class="post-button"
          :disabled="!isValid"
          :class="{ 'disabled-button': !isValid }"
          >SAVE CHANGES</CustomButtons
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEditHouseStore } from '@/stores/editListingStore'
import { useImageUploadStore } from '@/stores/uploadImageStore'
import { useRouter, useRoute } from 'vue-router'
import CustomButtons from '@/shared/CustomButtons.vue'
import FormInput from '@/shared/FormInput.vue'

const HOUSE_LISTING_API_KEY = 'FPNh7v3pOKHkqtEJ2IB1o8zjLWyAmrxg'

const router = useRouter()
const route = useRoute()
const editHouseStore = useEditHouseStore()
const imageUploadStore = useImageUploadStore()

// Reference to the file input element
const fileInput = ref<HTMLInputElement | null>(null)
// Reference for the image preview
const imagePreview = ref<string | null>(null)
// Flag to indicate if the form has been submitted
const isSubmitted = ref(false)

// Object holding the details of the house to be edited
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

// Computed property to check if the form is valid
const isValid = computed(() => {
  return (
    editedHouse.value.streetName &&
    editedHouse.value.houseNumber &&
    editedHouse.value.zip &&
    editedHouse.value.city &&
    Number(editedHouse.value.price) > 0 &&
    Number(editedHouse.value.bedrooms) > 0 &&
    Number(editedHouse.value.bathrooms) > 0 &&
    Number(editedHouse.value.size) > 0 &&
    Number(editedHouse.value.constructionYear) > 0 &&
    editedHouse.value.description
  )
})

// Function to fetch house data from API and populate the form
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
    console.log(houseData)

    // Populate the form with fetched data
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

// Fetch house data when the component is mounted
onMounted(async () => {
  const houseId = route.params.id as string
  await fetchHouseData(houseId)
})

// Navigate back to the previous page
const goBack = () => {
  router.go(-1)
}

// Handle form submission
const submitForm = async () => {
  isSubmitted.value = true
  if (!isValid.value) return
  try {
    validateForm()
    const houseId = route.params.id as string
    console.log('Submitting form for house ID:', houseId)
    console.log('Form data:', editedHouse.value)

    // Send updated house data to the server
    const result = await editHouseStore.editHouse(houseId, editedHouse.value)
    console.log('Edit result:', result)

    // Upload the image if provided
    if (editedHouse.value.image) {
      console.log('Uploading image...')
      await imageUploadStore.uploadHouseImage(houseId, editedHouse.value.image)
    }

    // Redirect to home page after successful submission
    router.push('/')
  } catch (error) {
    console.error('There was an error during editing of the listing:', error)
  }
}

// Validate required fields in the form
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

// Handle image file upload
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!(target.files && target.files.length > 0)) {
    return
  }
  const file = target.files[0]
  editedHouse.value.image = file

  // Create image preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// Trigger the file input click
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Remove the selected image and clear the preview
const removeImage = () => {
  imagePreview.value = null
  editedHouse.value.image = null
}
</script>

<style scoped>
/* Container for the entire edit listing form */
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

/* Wrapper for form content */
.content-wrapper {
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
}

/* Header for the form */
.listing-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* Styling for the back button */
.listing-header .back {
  width: 32px;
  margin-bottom: 10px;
  cursor: pointer;
}

/* Styling for file upload label */
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

/* Style for upload icon or preview image */
.upload-label img {
  object-fit: cover;
}

/* Container for the image preview and removal button */
.image-container {
  position: relative;
}

/* Size of the image preview */
.image-preview {
  width: 104px;
}

/* Style for the remove image button */
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
  z-index: 10;
  font-size: 1.5rem;
}

/* Header text styling */
.listing-header h2 {
  text-align: center;
  width: 80%;
}

/* Margin for form group elements */
.form-group {
  margin-bottom: 20px;
}

/* Row layout for grouped form inputs */
.form-row {
  display: flex;
  gap: 20px;
}

/* Flex style for form row items */
.form-row .form-group {
  flex: 1;
}

/* Styling for form labels */
label {
  display: block;
  margin-bottom: 5px;
  font-weight: lighter;
}

/* Styling for input fields, select elements, and textarea */
input,
select,
textarea {
  width: 100%;
  padding: 15px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 12px;
}

/* Styling for textarea */
textarea {
  height: 100px;
  resize: vertical;
}

/* Style for input fields with validation error */
.error-border {
  border: 2px solid red;
}

/* Styling for error message */
.error-message {
  color: red;
}

/* Styling for save button */
.edit-listing-container .content-wrapper .post-button {
  width: 80%;
}

/* Style for disabled button */
.disabled-button {
  background-color: #d3d3d3;
  cursor: not-allowed;
  color: #000;
  opacity: 0.5;
}

/* Remove outline for disabled button */
.disabled-button:focus {
  outline: none;
}

/* Center button in form */
.edit-form-button {
  display: flex;
  justify-content: center;
}

/* Media query for larger screens */
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
