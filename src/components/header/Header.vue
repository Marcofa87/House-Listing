<template>
  <div>
    <div class="header">
      <h1>Houses</h1>
      <RouterLink to="/about">
        <img src="../../assets/ic_plus_grey@3x.png" alt="Edit listing" />
      </RouterLink>
    </div>

    <div class="search-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search for a house"
        v-model="searchTerm"
        @input="updateSearch"
      />
      <span v-if="showClearIcon" class="clear-icon" @click="clearSearch"></span>
    </div>

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
import CustomButton from '../../shared/CustomButtons.vue'
import NotFound from '../cardComponent/NotFound.vue'

const sortingByStore = useSortingByStore()
const searchTerm = ref('')
const showClearIcon = ref(false)

const filteredHousesCount = computed(() => sortingByStore.filteredAndSortedHouses.length)
const isSearching = computed(() => searchTerm.value.length > 0)

const resultText = computed(() => {
  return `Find ${filteredHousesCount.value} House${filteredHousesCount.value !== 1 ? 's' : ''}`
})

const updateSearch = () => {
  sortingByStore.setSearchTerm(searchTerm.value)
  showClearIcon.value = searchTerm.value.length > 0
}

const clearSearch = () => {
  searchTerm.value = ''
  sortingByStore.setSearchTerm('')
  showClearIcon.value = false
}

watch(searchTerm, (newValue) => {
  showClearIcon.value = newValue.length > 0
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
}

.input {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input[type='text'] {
  font-size: 12px;
  font-weight: 600;
  font-family: 'Open Sans', 'Regular';
}

.search-container {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #c3c3c3;
  padding-left: 45px;
  padding-right: 45px;
  background: url('../../assets/ic_search@3x.png') no-repeat left 15px center;
  background-size: 20px 20px;
  border: 2px solid #000;
  outline: none;
}

input:focus {
  border-color: #666;
}

.clear-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: url('../../assets/ic_clear@3x.png') no-repeat center;
  background-size: contain;
  cursor: pointer;
}

.buttons {
  max-width: 90%;
  margin: 50px auto;
}
</style>
