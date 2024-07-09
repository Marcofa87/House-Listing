<template>
  <div>
    <div class="header">
      <h1>Houses</h1>
      <RouterLink to="/about">
        <img src="../../assets/ic_plus_grey@3x.png" alt="Edit listing" />
      </RouterLink>
    </div>
    <div class="input">
      <input type="text" placeholder="Search for a house" />
    </div>
    <div class="buttons">
      <CustomButton color="#EB5440" borderRadius="15px 0 0 15px" @click="sortByPrice"
        >Price</CustomButton
      >
      <CustomButton color="#C3C3C3" borderRadius="0 15px 15px 0" @click="sortBySize"
        >Size</CustomButton
      >
    </div>
  </div>
</template>

<script setup>
import CustomButton from '../../shared/CustomButtons.vue'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.input {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input {
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  background: #c3c3c3;
}

.buttons {
  max-width: 90%;
  margin: 50px auto;
}
</style>
