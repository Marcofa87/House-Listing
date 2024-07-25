<template>
  <div class="delete-listing-popup">
    <h2>Conferma eliminazione</h2>
    <p>Sei sicuro di voler eliminare questo appartamento?</p>
    <button @click="confirmDelete" :disabled="isDeleting">Conferma</button>
    <button @click="cancelDelete" :disabled="isDeleting">Annulla</button>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHouseStore } from '../../stores/deleteListingStore'

const props = defineProps<{
  houseId: string
}>()

const emit = defineEmits(['close', 'deleted'])

const houseStore = useHouseStore()
const isDeleting = ref(false)
const error = ref('')

const confirmDelete = async () => {
  isDeleting.value = true
  error.value = ''

  try {
    await houseStore.deleteHouse(props.houseId)
    emit('deleted', props.houseId)
    emit('close')
  } catch (e: any) {
    console.error(e)
    error.value = `Si è verificato un errore durante l'eliminazione: ${e.message}`
  } finally {
    isDeleting.value = false
  }
}

const cancelDelete = () => {
  emit('close')
}
</script>

<style scoped>
.delete-listing-popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
