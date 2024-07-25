<template>
  <div class="delete-listing-container">
    <div class="delete-listing-popup">
      <div class="delete-listing-text">
        <h2>Delete Listing</h2>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone</p>
      </div>
      <div class="delete-listing-button-container">
        <CustomButtons @click="deleteListing" borderRadius="8px">YES. DELETE</CustomButtons>
        <CustomButtons @click="deleteListing" borderRadius="8px" color="#4A4B4C"
          >GO BACK</CustomButtons
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButtons from '@/shared/CustomButtons.vue'

const deleteListing = () => {
  console.log('click delete')
}
</script>

<style scoped>
.delete-listing-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-listing-popup {
  background-color: white;
  width: 50%;
  max-width: 500px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.delete-listing-text {
  margin: 30px 0;
}

.delete-listing-text h2,
p {
  margin: 5px;
}

.delete-listing-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.delete-listing-button-container button {
  width: 70%;
}
</style>
