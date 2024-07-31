<template>
  <div class="house-detail-container">
    <HouseDetail />
    <div class="recommended">
      <h2>Recommended for you</h2>
      <ListingCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import HouseDetail from './HouseDetail.vue'
import ListingCard from '../cardComponent/ListingCard.vue'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
console.log(route.params.id)
</script>

<style scoped>
h2 {
  margin-left: 20px;
}

@media (min-width: 1024px) {
  .house-detail-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  .recommended {
    width: 70%;
  }
}
</style>
