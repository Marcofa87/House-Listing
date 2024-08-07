<template>
  <div>
    <!-- Message displayed when there are filtered houses -->
    <div v-if="filteredHousesCount > 0">
      <h2 class="filtered-result">{{ resultText }}</h2>
    </div>
    <!-- Message displayed when no results are found -->
    <div v-else>
      <img :src="emptyHouse" class="not-found" alt="Not found image" />
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>
</template>

<script setup>
import emptyHouse from '@/assets/img_empty_houses@3x.png'
const props = defineProps({
  filteredHousesCount: {
    type: Number,
    required: true
  },
  resultText: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
/* Styles for filtered result text */
.filtered-result {
  text-align: left;
  margin-left: 10px;
}

/* Styles for the not found image */
.not-found {
  display: block;
  margin: 0 auto;
  max-width: 60%;
  padding: 50px;
  height: auto;
}

/* Styles for messages */
p {
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 400;
  margin: 10px 0;
}
</style>
