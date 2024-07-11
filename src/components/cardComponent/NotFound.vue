<template>
  <div>
    <div v-if="filteredHousesCount > 0">
      <h3 class="filtered-result">{{ resultText }}</h3>
    </div>
    <div v-else>
      <img src="../../assets/img_empty_houses@3x.png" class="not-found" alt="Not found image" />
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>
</template>

<script setup>
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
.filtered-result {
  text-align: left;
  margin-left: 10px;
}
.not-found {
  display: block;
  margin: 0 auto;
  max-width: 60%;
  padding: 50px;
  height: auto;
}

p {
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 14px;
  margin: 10px 0;
}
</style>
