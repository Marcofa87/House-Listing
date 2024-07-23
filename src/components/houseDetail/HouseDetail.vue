<template>
  <main>
    <div v-if="houseStore.loading">Loading...</div>
    <div v-else-if="houseStore.error">Error: {{ houseStore.error }}</div>
    <div v-else-if="houseStore.house" class="house-detail-container">
      <div class="house-detail-images-container">
        <div class="house-detail-images">
          <div class="back-img">
            <img src="@/assets/ic_back_white@3x.png" alt="back button" @click="goBack" />
          </div>
          <div class="edit-delete-buttons">
            <router-link :to="{ name: 'edit-listing', params: { id: houseStore.house.id } }">
              <img src="@/assets/ic_edit_white@3x.png" alt="edit button" />
            </router-link>

            <img src="@/assets/ic_delete_white@3x.png" alt="delete button" />
          </div>
        </div>
        <div class="placeholder-container">
          <img
            class="placeholder-image"
            src="../../assets/img_placeholder_house@3x.png"
            alt="placeholder_house_image"
          />
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
          <p>{{ houseStore.house.location.zip }} {{ houseStore.house.location.city }}</p>
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
            <p>{{ houseStore.house.rooms.bathrooms }}</p>
          </div>
          <div class="house-detail-price-garage">
            <img src="@/assets/ic_garage@3x.png" alt="garage icon" />
            <p>{{ houseStore.house.hasGarage ? 'Yes' : 'No' }}</p>
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
.house-detail-images-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.back-img img,
.edit-delete-buttons img {
  width: 32px;
  z-index: 4;
  cursor: pointer;
}

.edit-delete-buttons img {
  margin: 0 10px;
}

.placeholder-container {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.placeholder-image {
  max-width: 100%;
  height: auto;
}

.container {
  padding: 50px;
  border-radius: 35px 35px;
  position: relative;
  top: -50px;
  z-index: 3;
  background-color: white;
}

.container img {
  width: 32px;
}

.house-detail-street,
.house-detail-zip-house-city,
.house-detail-price-size-construction-container,
.house-detail-description {
  margin: 40px;
}

.house-detail-zip-house-city {
  display: flex;
  align-items: center;
}

.house-detail-price-size-construction-container {
  display: flex;
  justify-content: space-between;
}

.house-detail-price-size-construction-container > div {
  display: flex;
  align-items: center;
}

.house-detail-price-size-construction-container img {
  margin-right: 10px;
}
</style>
