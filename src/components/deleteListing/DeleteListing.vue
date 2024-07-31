<template>
  <div class="delete-listing-container">
    <div class="delete-listing-popup">
      <div class="delete-listing-text">
        <h2>Delete Listing</h2>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone</p>
      </div>
      <div class="delete-listing-button-container">
        <CustomButtons @click="confirmDelete" borderRadius="8px">YES. DELETE</CustomButtons>
        <CustomButtons @click="cancelDelete" borderRadius="8px" color="#4A4B4C"
          >GO BACK</CustomButtons
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButtons from '@/shared/CustomButtons.vue'
import { useDeleteListingStore } from '@/stores/deleteListingStore'
import { useDeletePopupStore } from '@/stores/deletePopupStore'
import { useHouseListingStore } from '@/stores/houseListing'
import { useRouter } from 'vue-router'

const deletePopupStore = useDeletePopupStore()
const deleteListingStore = useDeleteListingStore()
const houseListingStore = useHouseListingStore()
const router = useRouter()

const confirmDelete = async () => {
  if (deletePopupStore.houseToDeleteId) {
    try {
      await deleteListingStore.deleteHouse(deletePopupStore.houseToDeleteId)
      deletePopupStore.closeDeletePopup()
      await houseListingStore.fetchHouses()
      router.push({ name: 'home' })
    } catch (error) {
      console.error('Failed to delete house:', error)
    }
  }
}

const cancelDelete = () => {
  deletePopupStore.closeDeletePopup()
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
  z-index: 10;
}

.delete-listing-popup {
  background-color: white;
  max-width: 80%;
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
