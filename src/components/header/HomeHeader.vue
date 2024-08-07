<div>
  <!-- Header section containing the title and navigation link -->
  <div class="header">
    <!-- Page title -->
    <h1>Houses</h1>
    <!-- Link to create a new listing -->
    <RouterLink to="/new-listing" class="add-listing-link">
      <!-- Icon for mobile view -->
      <img :src="plusGreyButton" alt="Edit listing" class="mobile-icon" />
      <!-- Button for desktop view -->
      <CustomButton color="#EB5440" borderRadius="15px" class="desktop-icon">
        + CREATE NEW
      </CustomButton>
    </RouterLink>
  </div>

  <!-- Container for desktop layout components -->
  <div class="desktop-container">
    <!-- Search input and clear icon -->
    <div class="search-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search for a house"
        v-model="searchTerm"
        @input="updateSearch"
      />
      <!-- Clear icon shown when there is a search term -->
      <span v-if="showClearIcon" class="clear-icon" @click="clearSearch"></span>
    </div>

    <!-- Buttons for sorting by price or size -->
    <div class="buttons">
      <CustomButton
        color="#EB5440"
        borderRadius="15px 0 0 15px"
        @click="sortingByStore.setSortBy('price')"
      >
        Price
      </CustomButton>
      <CustomButton
        color="#C3C3C3"
        borderRadius="0 15px 15px 0"
        @click="sortingByStore.setSortBy('size')"
      >
        Size
      </CustomButton>
    </div>
  </div>

  <!-- Display a "Not Found" component when searching -->
  <NotFound
    v-if="isSearching"
    :filteredHousesCount="filteredHousesCount"
    :resultText="resultText"
  />
</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSortingByStore } from '@/stores/sortByStore'
import CustomButton from '@/shared/CustomButtons.vue'
import NotFound from '@/components/cardComponent/NotFound.vue'

import plusGreyButton from '@/assets/ic_plus_grey@3x.png'

// Using a store to handle sorting and search term
const sortingByStore = useSortingByStore()
// Local state for the search term and clear icon visibility
const searchTerm = ref('')
const showClearIcon = ref(false)

// Computed property to get the count of filtered houses
const filteredHousesCount = computed(() => sortingByStore.filteredAndSortedHouses.length)
// Computed property to determine if a search term is present
const isSearching = computed(() => searchTerm.value.length > 0)

// Computed property to generate the result text based on the count
const resultText = computed(() => {
return Find ${filteredHousesCount.value} House${filteredHousesCount.value === 1 ? '' : 's'}
})

// Function to update the search term in the store and toggle clear icon
const updateSearch = () => {
sortingByStore.setSearchTerm(searchTerm.value)
showClearIcon.value = searchTerm.value.length > 0
}

// Function to clear the search input and reset the store
const clearSearch = () => {
searchTerm.value = ''
sortingByStore.setSearchTerm('')
showClearIcon.value = false
}

// Watcher to handle the clear icon visibility based on the search term
watch(searchTerm, (newValue) => {
showClearIcon.value = newValue.length > 0
})
</script>

<style scoped>
/* Header styling including alignment and spacing */
.header {
display: flex;
justify-content: space-around;
align-items: center;
margin: 30px 0;
}

.desktop-container {
margin: 30px auto;
}

/* Input container styling for the search field */
.input {
display: flex;
justify-content: center;
margin-top: 20px;
}

/* Styling for search input field */
input[type='text'] {
font-weight: 600;
}

/* Container for search input field */
.search-container {
position: relative;
width: 90%;
margin: 0 auto;
background-color: var(--color-tertiary-1);
border-radius: 10px;
}

/* Styling for the input field */
input {
width: 100%;
padding: 20px;
border-radius: 10px;
background-color: #c3c3c3;
padding-left: 45px;
padding-right: 45px;
background: url('@/assets/ic_search@3x.png') no-repeat left 15px center;
background-size: 20px 20px;
border: 2px solid #000;
outline: none;
}

/* Styling for input field on focus */
input:focus {
border-color: #666;
}

/* Styling for the clear icon */
.clear-icon {
position: absolute;
right: 15px;
top: 50%;
transform: translateY(-50%);
width: 20px;
height: 20px;
background: url('@/assets/ic_clear@3x.png') no-repeat center;
background-size: contain;
cursor: pointer;
}

/* Container for sorting buttons */
.buttons {
max-width: 90%;
margin: 50px auto;
}

/* Styles for mobile and desktop versions of the add listing icon */
.mobile-icon {
display: block;
}

.desktop-icon {
display: none;
}

/* Media query for larger screens (desktop view) */
@media screen and (min-width: 1024px) {
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px auto;
  width: 80%;
}

.desktop-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.search-container {
  width: 40%;
  margin: 0;
}

.buttons {
  width: 35%;
  margin: 0;
}

input {
  margin-bottom: 0;
}

.mobile-icon {
  display: none;
}

.desktop-icon {
  display: block;
  cursor: pointer;
  width: 200px;
  border: none;
  outline: none;
}
}
</style