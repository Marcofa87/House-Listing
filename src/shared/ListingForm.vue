<template>
  <div class="listing-container">
    <div class="content-wrapper">
      <div class="listing-header">
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>{{ title }}</h2>
      </div>

      <form @submit.prevent="submitForm">
        <FormInput
          id="streetName"
          label="Street name"
          v-model="formData.streetName"
          placeholder="Enter the street name"
          required
        />

        <div class="form-row">
          <FormInput
            id="houseNumber"
            label="House Number"
            v-model="formData.houseNumber"
            placeholder="Enter house number"
            required
          />
          <FormInput
            id="numberAddition"
            label="Number Addition"
            v-model="formData.numberAddition"
            placeholder="e.g. A"
          />
        </div>

        <FormInput
          id="zip"
          label="Postal Code"
          v-model="formData.zip"
          placeholder="e.g. 1000 AA"
          required
        />

        <FormInput
          id="city"
          label="City"
          v-model="formData.city"
          placeholder="e.g. Utrecht"
          required
        />

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
            <img v-if="!imagePreview" src="../../assets/ic_upload@3x.png" alt="Upload" />
            <div v-else class="image-container">
              <img :src="imagePreview" alt="Preview" class="image-preview" />
              <div class="remove-image" @click.stop="removeImage">×</div>
            </div>
          </div>
        </div>

        <FormInput
          id="price"
          label="Price"
          v-model="formData.price"
          type="text"
          placeholder="e.g. €150.000"
          required
        />

        <div class="form-row">
          <FormInput
            id="size"
            label="Size"
            v-model="formData.size"
            type="text"
            placeholder="e.g. 60m2"
            required
          />
          <div class="form-group">
            <label for="hasGarage">Garage*</label>
            <select v-model="formData.hasGarage" id="hasGarage" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <FormInput
            id="bedrooms"
            label="Bedrooms"
            v-model="formData.bedrooms"
            type="text"
            placeholder="Number of bedrooms"
            required
          />
          <FormInput
            id="bathrooms"
            label="Bathrooms"
            v-model="formData.bathrooms"
            type="text"
            placeholder="Number of bathrooms"
            required
          />
        </div>

        <FormInput
          id="constructionYear"
          label="Construction Year"
          v-model="formData.constructionYear"
          type="text"
          placeholder="Construction year"
          required
        />

        <div class="form-group">
          <label for="description">Description*</label>
          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Description"
            :class="{ 'error-border': isSubmitted && !formData.description }"
            required
          ></textarea>
          <p v-if="isSubmitted && !isValid" class="error-message">Required field missing</p>
        </div>
      </form>
      <div class="form-button">
        <CustomButtons
          @click="submitForm"
          class="post-button"
          :disabled="!isValid"
          :class="{ 'disabled-button': !isValid }"
        >
          {{ submitButtonText }}
        </CustomButtons>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import CustomButtons from '@/shared/CustomButtons.vue'
import FormInput from '@/shared/FormInput.vue'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const isSubmitted = ref(false)

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  submitButtonText: {
    type: String,
    required: true
  },
  initialFormData: {
    type: Object,
    required: true
  }
})

const formData = ref({ ...props.initialFormData })

// Watch for changes in initialFormData to update formData
watch(
  () => props.initialFormData,
  (newData) => {
    console.log('New initialFormData received:', newData)
    formData.value = { ...newData }
  },
  { immediate: true }
)

const isValid = computed(() => {
  return (
    formData.value.streetName &&
    formData.value.houseNumber &&
    formData.value.zip &&
    formData.value.city &&
    Number(formData.value.price) > 0 &&
    Number(formData.value.bedrooms) > 0 &&
    Number(formData.value.bathrooms) > 0 &&
    Number(formData.value.size) > 0 &&
    Number(formData.value.constructionYear) > 0 &&
    formData.value.description
  )
})

const emit = defineEmits(['submit'])

const goBack = () => router.go(-1)

const submitForm = () => {
  isSubmitted.value = true
  console.log('Form submission attempted with data:', formData.value)
  if (!isValid.value) return
  emit('submit', formData.value)
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!(target.files && target.files.length > 0)) {
    console.log('No files selected for upload.')
    return
  }
  const file = target.files[0]
  formData.value.image = file

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
    console.log('Image preview set:', imagePreview.value)
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  formData.value.image = null
  imagePreview.value = null
  console.log('Image removed.')
}

const triggerFileInput = () => {
  fileInput.value?.click()
}
</script>

<style scoped>
.listing-container {
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

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

select,
textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
}

select {
  height: 50px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.error-border {
  border: 2px solid red;
}

.error-message {
  color: red;
}

.form-button {
  display: flex;
  justify-content: center;
}

.post-button {
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

@media (min-width: 1024px) {
  .listing-container {
    justify-content: flex-start;
    padding-left: 150px;
  }

  .content-wrapper {
    margin: 0;
  }
}
</style>
