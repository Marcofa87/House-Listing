<template>
  <main>
    <div v-if="houseStore.loading">Loading...</div>
    <div v-else-if="houseStore.error">Error: {{ houseStore.error }}</div>
    <div v-else-if="houseStore.house" class="house-detail-container">
      <div class="house-detail-images">
        <div class="back-img">
          <img src="@/assets/ic_back_white@3x.png" alt="back button" @click="goBack" />
        </div>
        <div class="edit-delete-buttons">
          <img src="@/assets/ic_edit_white@3x.png" alt="edit button" />
          <img src="@/assets/ic_delete_white@3x.png" alt="delete button" />
        </div>
      </div>
      <div class="container">
        <div class="house-detail-street">
          <h2>
            {{ houseStore.house.location.street }} {{ houseStore.house.location.houseNumber }}
          </h2>
        </div>
        <div class="house-detail-zip-house-city">
          <img src="@/assets/ic_location@3x.png" alt="location icon" />
          <p>{{ houseStore.house.location.zip }}{{ houseStore.house.location.city }}</p>
        </div>
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
        <div class="house-detail-price-size-construction-container">
          <div class="house-detail-price-bed-bath">
            <img src="@/assets/ic_bed@3x.png" alt="bed icon" />
            <p>{{ houseStore.house.rooms.bedrooms }}</p>
          </div>
          <div>
            <img src="@/assets/ic_bath@3x.png" alt="bath icon" />
            <p>{{ houseStore.house.rooms.bathrooms }}m²</p>
          </div>
          <div class="house-detail-price-garage">
            <img src="@/assets/ic_garage@3x.png" alt="garage icon" />
            <p>Built in {{ houseStore.house.hasGarage ? 'Yes' : 'No' }}</p>
          </div>
        </div>
        <div class="house-detail-description">
          <p>{{ houseStore.house.description }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHouseDetailStore } from '@/stores/houseDetailStore'
import { useRoute, useRouter } from 'vue-router'

const houseStore = useHouseDetailStore()
const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
console.log(id)

const goBack = () => {
  router.go(-1)
}

houseStore.fetchHouseDetails(id)
</script>

<style scoped>
.house-detail-container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.house-detail-container img {
  width: 32px;
}

.house-detail-images {
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
  height: 150px;
  background-image: url('../../assets/img_placeholder_house@3x.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.back-img img {
  cursor: pointer;
}

.edit-delete-buttons img {
  margin: 0 10px;
}

.container {
  padding: 50px;
}

.house-detail-zip-house-city {
  display: flex;
  align-items: center;
  border: 1px solid gold;
  padding: 10px;
}

.house-detail-price-size-construction-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.house-detail-price-size-construction-container > div {
  display: flex;
  align-items: center;
}

.house-detail-price-size-construction-container img {
  margin-right: 5px;
}

.house-detail-description {
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
