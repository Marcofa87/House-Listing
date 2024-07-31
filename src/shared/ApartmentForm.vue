<template>
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

    <FormInput id="city" label="City" v-model="formData.city" placeholder="e.g. Utrecht" required />

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
      type="number"
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
      <p v-if="isSubmitted && !isValid" class="error-message">Required details</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FormInput from '@/shared/FormInput.vue'

const props = defineProps(['initialData'])
const emit = defineEmits(['submit'])

const formData = ref(props.initialData || {})
const isSubmitted = ref(false)

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

const submitForm = () => {
  isSubmitted.value = true
  if (isValid.value) {
    emit('submit', formData.value)
  }
}
</script>

<style scoped>
.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: lighter;
}

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

.error-border {
  border: 2px solid red;
}

.error-message {
  color: red;
}
</style>
