<template>
  <div>
    <HouseDetail />
    <h2>Recommended for you</h2>
    <ListingCard />
  </div>
</template>

<script setup lang="ts">
import HouseDetail from './HouseDetail.vue'
import ListingCard from '../cardComponent/ListingCard.vue'
</script>

<style scoped>
h2 {
  margin-left: 20px;
}
</style>
