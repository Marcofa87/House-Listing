<template>
  <main>
    <!-- Display loading message while fetching data -->
    <div v-if="houseStore.loading">Loading...</div>
    <!-- Display error message if there is an error -->
    <div v-else-if="houseStore.error">Error: {{ houseStore.error }}</div>
    <!-- Display house details if the data is successfully fetched -->
    <div v-else-if="houseStore.house">
      <!-- Container for house images and back button -->
      <div class="house-detail-images-container">
        <div class="house-detail-images">
          <!-- Back button to navigate to the previous page -->
          <div class="back-img">
            <img src="@/assets/ic_back_white@3x.png" alt="back button" @click="goBack" />
          </div>
          <!-- Component to display listing details -->
          <MadeByMeListing
            v-if="houseStore.house"
            :house="houseStore.house"
            :madeByMe="houseStore.house.madeByMe"
          />
        </div>
        <!-- Placeholder image displayed when no actual images are available -->
        <div class="placeholder-container">
          <img
            class="placeholder-image"
            src="../../assets/img_placeholder_house@3x.png"
            alt="placeholder_house_image"
          />
        </div>
      </div>

      <!-- Container for detailed house information -->
      <div class="container">
        <!-- House address -->
        <div class="house-detail-street">
          <h2>
            {{ houseStore.house.location.street }} {{ houseStore.house.location.houseNumber }}
          </h2>
        </div>
        <!-- Location, zip code, and city -->
        <div class="house-detail-zip-house-city">
          <img src="@/assets/ic_location@3x.png" alt="location icon" />
          <p>{{ houseStore.house.location.zip }} {{ houseStore.house.location.city }}</p>
        </div>
        <!-- Price, size, and construction year -->
        <div class="house-detail-price-size-construction-container">
          <div>
            <img src="@/assets/ic_price@3x.png" alt="euro icon" />
            <p>{{ houseStore.house.price }}</p>
          </div>
          <div>
            <img src="@/assets/ic_size@3x.png" alt="size icon" />
            <p>{{ houseStore.house.size }}m²</p>
          </div>
          <div>
            <img src="@/assets/ic_construction_date@3x.png" alt="construction date icon" />
            <p>Built in {{ houseStore.house.constructionYear }}</p>
          </div>
        </div>
        <!-- Number of bedrooms, bathrooms, and garage availability -->
        <div class="house-detail-price-size-construction-container">
          <div class="house-detail-price-bed-bath">
            <img src="@/assets/ic_bed@3x.png" alt="bed icon" />
            <p>{{ houseStore.house.rooms.bedrooms }}</p>
          </div>
          <div>
            <img src="@/assets/ic_bath@3x.png" alt="bath icon" />
            <p>{{ houseStore.house.rooms.bathrooms }}</p>
          </div>
          <div class="house-detail-price-garage">
            <img src="@/assets/ic_garage@3x.png" alt="garage icon" />
            <p>{{ houseStore.house.hasGarage ? 'Yes' : 'No' }}</p>
          </div>
        </div>
        <!-- Description of the house -->
        <div class="house-detail-description">
          <p>{{ houseStore.house.description }}</p>
        </div>
      </div>
    </div>
    <!-- Component to handle deletion of the listing, shown when popup is open -->
    <DeleteListing v-if="deletePopupStore.isOpen" />
  </main>
</template>

<script setup lang="ts">
import MadeByMeListing from '@/shared/MadeByMeListing.vue'
import DeleteListing from '@/components/deleteListing/DeleteListing.vue'
import { useHouseDetailStore } from '@/stores/houseDetailStore'
import { useDeletePopupStore } from '@/stores/deletePopupStore'
import { useRoute, useRouter } from 'vue-router'
import '../../assets/base.css'
import '../../assets/main.css'

// Importing store and router hooks for handling house details and deletion
const houseStore = useHouseDetailStore()
const deletePopupStore = useDeletePopupStore()

const route = useRoute()
const router = useRouter()

// Extracting house ID from route parameters
const id = Number(route.params.id)

// Function to navigate back to the previous page
const goBack = () => {
  router.go(-1)
}

// Fetching house details based on the ID from route parameters
houseStore.fetchHouseDetails(id)
</script>

<style scoped>
/* Container for house images and back button */
.house-detail-images-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styling for the images section, including the back button */
.house-detail-images {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
  z-index: 2;
  padding: 10px;
}

/* Styling for the back button image and edit/delete buttons */
.back-img img,
.edit-delete-buttons img {
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin: 5px;
  z-index: 4;
}

/* Container for placeholder image */
.placeholder-container {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}

/* Styling for the placeholder image */
.placeholder-image {
  max-width: 100%;
  height: auto;
}

/* Container for house details */
.container {
  padding: 50px;
  border-radius: 35px 35px;
  position: relative;
  top: -50px;
  z-index: 3;
  background-color: white;
}

/* Styling for icons in the details section */
.container img {
  width: 32px;
}

/* Margins for different sections of house details */
.house-detail-street,
.house-detail-zip-house-city,
.house-detail-price-size-construction-container,
.house-detail-description {
  margin: 20px;
}

/* Flexbox layout for location and other details */
.house-detail-zip-house-city {
  display: flex;
  align-items: center;
}

.house-detail-price-size-construction-container {
  display: flex;
  justify-content: space-between;
}

.house-detail-price-size-construction-container div {
  display: flex;
  align-items: center;
}

/* Margins for icons in the details section */
.house-detail-price-size-construction-container img {
  margin-right: 10px;
}

/* Media query for larger screens to adjust layout */
@media (min-width: 1024px) {
  .house-detail-price-size-construction-container {
    justify-content: flex-start;
  }

  .house-detail-price-size-construction-container div {
    margin: 10px;
  }
}
</style>
