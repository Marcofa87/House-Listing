<template>
  <div class="create-listing-container">
    <div class="content-wrapper">
      <div class="listing-header">
        <img src="@/assets/ic_back_grey@3x.png" alt="Logo" class="back" @click="goBack" />
        <h2>Create new listing</h2>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="streetName">Street Name*</label>
          <input
            id="streetName"
            v-model="newApartment.streetName"
            placeholder="Enter the street name"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="houseNumber">House Number*</label>
            <input
              id="houseNumber"
              v-model="newApartment.houseNumber"
              placeholder="Enter house number"
              required
            />
          </div>
          <div class="form-group">
            <label for="numberAddition">Number Addition</label>
            <input id="numberAddition" v-model="newApartment.numberAddition" placeholder="e.g. A" />
          </div>
        </div>

        <div class="form-group">
          <label for="zip">Postal Code*</label>
          <input id="zip" v-model="newApartment.zip" placeholder="e.g. 1000 AA" required />
        </div>

        <div class="form-group">
          <label for="city">City*</label>
          <input id="city" v-model="newApartment.city" placeholder="e.g. Utrecht" required />
        </div>

        <div class="form-group">
          <label for="image">Upload Picture (PNG or JPG)*</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*" />
        </div>

        <div class="form-group">
          <label for="price">Price*</label>
          <input
            id="price"
            v-model.number="newApartment.price"
            type="text"
            placeholder="e.g. €150.000"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="size">Size*</label>
            <input
              id="size"
              v-model.number="newApartment.size"
              type="text"
              placeholder="e.g. 60m2"
              required
            />
          </div>
          <div class="form-group">
            <label for="hasGarage">Garage*</label>
            <select v-model="newApartment.hasGarage" id="hasGarage" required>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="bedrooms">Bedrooms*</label>
            <input
              id="bedrooms"
              v-model.number="newApartment.bedrooms"
              type="text"
              placeholder="Number of bedrooms"
              required
            />
          </div>
          <div class="form-group">
            <label for="bathrooms">Bathrooms*</label>
            <input
              id="bathrooms"
              v-model.number="newApartment.bathrooms"
              type="text"
              placeholder="Number of bathrooms"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="constructionYear">Construction Year*</label>
          <input
            id="constructionYear"
            v-model.number="newApartment.constructionYear"
            type="number"
            placeholder="Construction year"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description*</label>
          <textarea
            id="description"
            v-model="newApartment.description"
            placeholder="Description"
            required
          ></textarea>
        </div>
      </form>
      <div class="post-form-button">
        <CustomButtons :disabled="isDisabled" @click="submitForm" class="post-button"
          >POST</CustomButtons
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApartmentStore } from '../../stores/createListingStore'
import { useRouter } from 'vue-router'
import CustomButtons from '@/shared/CustomButtons.vue'

const isDisabled = ref(true)

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const apartmentStore = useApartmentStore()

const newApartment = ref({
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
  description: ''
})
console.log(newApartment)

const submitForm = async () => {
  try {
    await apartmentStore.createApartment(newApartment.value)
    // Resetting form
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
      description: ''
    }

    router.push('/')
  } catch (error) {
    console.error('There was an error during creation of the announce:', error)
  }
}

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    // Handle the file upload
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
  max-width: 80px;
  margin-bottom: 10px;
  cursor: pointer;
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
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
