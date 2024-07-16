<template>
  <main>
    <div v-if="houseStore.loading">Caricamento in corso...</div>
    <div v-else-if="houseStore.error">Errore: {{ houseStore.error }}</div>
    <div v-else-if="houseStore.house" class="house-detail-container">
      <div class="house-detail-images">
        <div>
          <img src="../../assets/ic_back_white@3x.png" alt="back button" />
        </div>
        <div>
          <img src="../../assets/ic_edit@3x.png" alt="edit button" />
          <img src="../../assets/ic_delete@3x.png" alt="delete button" />
        </div>
      </div>
      <div>
        <div>
          <h2>
            {{ houseStore.house.location.street }} {{ houseStore.house.location.houseNumber }}
          </h2>
          <img src="../../assets/ic_location@3x.png" alt="location icon" />
          <p>{{ houseStore.house.location.zip }}{{ houseStore.house.location.city }}</p>
        </div>
        <div>
          <div>
            <img src="../../assets/ic_price@3x.png" alt="euro icon" />
            <p>{{ houseStore.house.price }}</p>
          </div>
          <div>
            <img src="../../assets/ic_size@3x.png" alt="size icon" />
            <p>{{ houseStore.house.size }}m²</p>
          </div>
          <div>
            <img src="../../assets/ic_construction_date@3x.png" alt="construction date icon" />
            <p>Built in {{ houseStore.house.constructionYear }}</p>
          </div>
        </div>
        <div>
          <div>
            <img src="../../assets/ic_bed@3x.png" alt="bed icon" />
            <p>{{ houseStore.house.rooms.bedrooms }}</p>
          </div>
          <div>
            <img src="../../assets/ic_bath@3x.png" alt="bath icon" />
            <p>{{ houseStore.house.rooms.bathrooms }}m²</p>
          </div>
          <div>
            <img src="../../assets/ic_garage@3x.png" alt="garage icon" />
            <p>Built in {{ houseStore.house.hasGarage ? 'Yes' : 'No' }}</p>
          </div>
        </div>
        <div>
          <p>{{ houseStore.house.description }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHouseDetailStore } from '@/stores/houseDetailStore'
import { useRoute } from 'vue-router'

const houseStore = useHouseDetailStore()
const route = useRoute()

const id = Number(route.params.id)
console.log(id)

houseStore.fetchHouseDetails(id)
</script>

<style scoped>
.house-detail-container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.house-detail-images {
  display: flex;
  justify-content: space-between;
}
</style>
