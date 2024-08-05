<template>
  <!-- Display edit and delete buttons if the house was created by the current user -->
  <div v-if="house.madeByMe" class="edit-delete">
    <!-- Router link for navigating to the edit page -->
    <router-link :to="{ name: 'edit-listing', params: { id: house.id } }">
      <img src="../assets/ic_edit@3x.png" alt="edit button" />
    </router-link>
    <!-- Delete button triggers the delete confirmation popup -->
    <img src="../assets/ic_delete@3x.png" alt="delete button" @click="openDeletePopup" />
  </div>
</template>

<script setup lang="ts">
import { useDeletePopupStore } from '../stores/deletePopupStore'

// Define the properties for the component
const props = defineProps({
  house: {
    type: Object,
    required: true
  },
  madeByMe: {
    type: Boolean,
    required: true
  }
})

// Access the store for managing delete popup state
const deletePopupStore = useDeletePopupStore()

// Function to open the delete confirmation popup
const openDeletePopup = () => {
  deletePopupStore.openDeletePopup(props.house.id)
}
</script>

<style scoped>
/* Styles for the edit and delete buttons container */
.edit-delete {
  display: flex;
  justify-content: flex-end;
}

.edit-delete img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: 5px;
}
</style>
