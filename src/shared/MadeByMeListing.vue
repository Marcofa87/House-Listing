<template>
  <div v-if="house.madeByMe" class="edit-delete">
    <router-link :to="{ name: 'edit-listing', params: { id: house.id } }">
      <img src="../assets/ic_edit@3x.png" alt="edit button" />
    </router-link>
    <img src="../assets/ic_delete@3x.png" alt="delete button" @click="openDeletePopup" />
  </div>
</template>

<script setup lang="ts">
import { useDeletePopupStore } from '../stores/deletePopupStore'
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

const deletePopupStore = useDeletePopupStore()

const openDeletePopup = () => {
  deletePopupStore.openDeletePopup(props.house.id)
}
</script>

<style scoped>
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
