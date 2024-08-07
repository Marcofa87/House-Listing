<template>
  <div>
    <!-- Container for displaying the list of houses -->
    <div class="houses-container">
      <!-- Card for each house -->
      <div class="house-detail-card" v-for="house in houses" :key="house.id">
        <!-- Image section with a link to house details -->
        <div class="detail-image">
          <router-link :to="{ name: 'house-detail', params: { id: house.id } }">
            <img :src="house.image" alt="House image detail" class="house-image" />
          </router-link>
        </div>
        <!-- Container for house details and amenities -->
        <div class="house-detail-container">
          <div class="house-detail-location-edit-delete">
            <!-- Location details of the house -->
            <div class="house-detail-location">
              <h2>{{ house.location.street }}</h2>
              <p>€ {{ house.price }}</p>
              <p>{{ house.location.zip }} {{ house.location.city }}</p>
            </div>
            <!-- Component to display whether the listing is created by the user -->
            <MadeByMeListing
              :house="house"
              :madeByMe="house.madeByMe"
              :deleteButton="deleteButton"
              :editButton="editButton"
            />
          </div>
          <!-- Amenities details like bedrooms, bathrooms, and size -->
          <div class="house-detail-amenities">
            <div class="house-detail-intern">
              <img :src="bedSize" alt="Bed picture" />
              <p>{{ house.rooms.bedrooms }}</p>
            </div>
            <div class="house-detail-intern">
              <img :src="bathNum" alt="Bath picture" />
              <p>{{ house.rooms.bathrooms }}</p>
            </div>
            <div class="house-detail-intern">
              <img :src="squareMeterSize" alt="Square meter picture" />
              <p>{{ house.size }} m²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Component to handle delete listing popup -->
    <DeleteListing v-if="deletePopupStore.isOpen" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

// Import stores and components
import { useHouseListingStore } from '@/stores/houseListing'
import { useSortingByStore } from '@/stores/sortByStore'
import { useDeletePopupStore } from '@/stores/deletePopupStore'
import MadeByMeListing from '@/shared/MadeByMeListing.vue'
import DeleteListing from '@/components/deleteListing/DeleteListing.vue'
import bedSize from '@/assets/ic_bed@3x.png'
import bathNum from '@/assets/ic_bath@3x.png'
import squareMeterSize from '@/assets/ic_size@3x.png'
import deleteButton from '@/assets/ic_delete@3x.png'
import editButton from '@/assets/ic_edit@3x.png'

// Initialize stores
const houseStore = useHouseListingStore()
const sortingByStore = useSortingByStore()
const deletePopupStore = useDeletePopupStore()

// Fetch houses data on component mount
onMounted(() => {
  houseStore.fetchHouses()
})

// Computed property for filtered and sorted houses
const houses = computed(() => sortingByStore.filteredAndSortedHouses)
</script>

<style scoped>
/* Styles for the main container */
.houses-container {
  width: 80%;
  margin: 0 auto;
}

/* Styles for the house detail card */
.house-detail-card {
  display: flex;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--color-background-2);
}

/* Styles for the image section */
.detail-image {
  width: 200px;
  height: 150px;
}

/* Styles for the house image */
.house-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* Styles for the house details container */
.house-detail-container {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px; /* Add some space between the image and details */
}

/* Styles for the location and edit/delete section */
.house-detail-location-edit-delete {
  display: flex;
  justify-content: space-between;
}

/* Styles for the text in the location section */
.house-detail-location h2,
.house-detail-location p {
  margin: 5px 0;
}

/* Styles for the amenities section */
.house-detail-amenities {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

/* Styles for individual amenities */
.house-detail-intern {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.house-detail-intern img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

/* Responsive design for smaller screens */
@media (max-width: 1024px) {
  .houses-container {
    width: 95%;
  }

  .detail-image {
    margin-bottom: 10px;
  }

  .house-detail-container {
    margin-left: 0;
  }
}
</style>
