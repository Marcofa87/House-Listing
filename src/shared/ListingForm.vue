<template>
  <form @submit.prevent="handleSubmit" class="listing-form">
    <h2>{{ title }}</h2>

    <!-- Street Name -->
    <div class="form-group">
      <label for="streetName">Street Name*</label>
      <input id="streetName" v-model="formData.streetName" required />
    </div>

    <!-- House Number and Addition -->
    <div class="form-row">
      <div class="form-group">
        <label for="houseNumber">House Number*</label>
        <input id="houseNumber" v-model="formData.houseNumber" required />
      </div>
      <div class="form-group">
        <label for="numberAddition">Number Addition</label>
        <input id="numberAddition" v-model="formData.numberAddition" />
      </div>
    </div>

    <!-- Zip and City -->
    <div class="form-row">
      <div class="form-group">
        <label for="zip">Zip Code*</label>
        <input id="zip" v-model="formData.zip" required />
      </div>
      <div class="form-group">
        <label for="city">City*</label>
        <input id="city" v-model="formData.city" required />
      </div>
    </div>

    <!-- Image Upload -->
    <div class="form-group">
      <label for="image">Image*</label>
      <input type="file" id="image" @change="handleImageChange" accept="image/*" required />
      <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="image-preview" />
    </div>

    <!-- Price -->
    <div class="form-group">
      <label for="price">Price*</label>
      <input id="price" v-model.number="formData.price" type="number" required />
    </div>

    <!-- Size -->
    <div class="form-group">
      <label for="size">Size (m²)*</label>
      <input id="size" v-model.number="formData.size" type="number" required />
    </div>

    <!-- Rooms -->
    <div class="form-row">
      <div class="form-group">
        <label for="bedrooms">Bedrooms*</label>
        <input id="bedrooms" v-model.number="formData.bedrooms" type="number" required />
      </div>
      <div class="form-group">
        <label for="bathrooms">Bathrooms*</label>
        <input id="bathrooms" v-model.number="formData.bathrooms" type="number" required />
      </div>
    </div>

    <!-- Construction Year -->
    <div class="form-group">
      <label for="constructionYear">Construction Year*</label>
      <input
        id="constructionYear"
        v-model.number="formData.constructionYear"
        type="number"
        required
      />
    </div>

    <!-- Has Garage -->
    <div class="form-group">
      <label for="hasGarage">Has Garage*</label>
      <select id="hasGarage" v-model="formData.hasGarage" required>
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
    </div>

    <!-- Description -->
    <div class="form-group">
      <label for="description">Description*</label>
      <textarea id="description" v-model="formData.description" required></textarea>
    </div>

    <button type="submit" :disabled="!isFormValid">{{ submitButtonText }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Apartment } from '../types'

// Define props
const props = defineProps<{
  title: string
  submitButtonText: string
  initialData?: Partial<Apartment>
}>()

// Define emits
const emit = defineEmits(['submit'])

// Initialize form data
const formData = ref<Partial<Apartment>>(
  props.initialData || {
    streetName: '',
    houseNumber: '',
    numberAddition: '',
    zip: '',
    city: '',
    price: 0,
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    constructionYear: 0,
    hasGarage: false,
    description: ''
  }
)

// Image preview
const imagePreview = ref<string | null>(null)

// Handle image change
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    formData.value.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Validate form
const isFormValid = computed(() => {
  return (
    formData.value.streetName &&
    formData.value.houseNumber &&
    formData.value.zip &&
    formData.value.city &&
    formData.value.price &&
    formData.value.size &&
    formData.value.bedrooms &&
    formData.value.bathrooms &&
    formData.value.constructionYear &&
    formData.value.description
  )
})

// Handle form submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}
</script>

<style scoped>
.listing-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}
</style>
