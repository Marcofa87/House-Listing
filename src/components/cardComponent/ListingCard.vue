<template>
  <div>
    <div class="houses-container">
      <div class="house-detail-card" v-for="house in houses" :key="house.id">
        <div class="detail-image">
          <router-link :to="{ name: 'house-detail', params: { id: house.id } }">
            <img :src="house.image" alt="House image detail" class="house-image"
          /></router-link>
        </div>
        <div class="house-detail-container">
          <div class="house-detail-location-edit-delete">
            <div class="house-detail-location">
              <h3>{{ house.location.street }}</h3>
              <p>€ {{ house.price }}</p>
              <p>{{ house.location.zip }} {{ house.location.city }}</p>
            </div>
            <div v-if="house.madeByMe" class="edit-delete">
              <img src="../../assets/ic_edit@3x.png" alt="edit button" /><img
                src="../../assets/ic_delete@3x.png"
                alt=""
              />
            </div>
          </div>
          <div class="house-detail-amenities">
            <div class="house-detail-intern">
              <img src="../../assets/ic_bed@3x.png" alt="Bed picture" />
              <p>{{ house.rooms.bedrooms }}</p>
            </div>
            <div class="house-detail-intern">
              <img src="../../assets/ic_bath@3x.png" alt="Bath picture" />
              <p>{{ house.rooms.bathrooms }}</p>
            </div>
            <div class="house-detail-intern">
              <img src="../../assets/ic_size@3x.png" alt="Square meter picture" />
              <p>{{ house.size }} m²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useHouseListingStore } from '../../stores/houseListing'
import { useSortingByStore } from '../../stores/sortByStore'

const houseStore = useHouseListingStore()
const sortingByStore = useSortingByStore()

onMounted(() => {
  houseStore.fetchHouses()
})

const houses = computed(() => sortingByStore.filteredAndSortedHouses)
const loading = computed(() => houseStore.loading)
</script>

<style scoped>
.house-detail-card {
  display: flex;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.detail-image {
  width: 25%;
}

.house-image {
  width: 100%;
  max-height: 200px;
  height: auto;
  border-radius: 5px;
}

.house-detail-container {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.house-detail-location-edit-delete {
  display: flex;
  justify-content: space-between;
}

.house-detail-location-edit-delete img {
  width: 32px;
  margin: 5px;
}

.house-detail-location h3 {
  margin: 0;
}

.house-detail-amenities {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.house-detail-intern {
  display: flex;
  align-items: center;
}

.house-detail-intern img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
</style>
