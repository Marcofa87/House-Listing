<template>
  <div class="new-listing">
    <div class="header">
      <img src="../assets//ic_back_grey@3x.png" />
      <h2>Create New Listing</h2>
    </div>
  </div>
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <div>Selected: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>Yes</option>
    <option>No</option>
  </select>
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <p>Message is:</p>
  <input v-model="message" placeholder="edit me" />
  <span>Multiline message is:</span>
  <p style="white-space: pre-line">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
  <CustomButtons>Price</CustomButtons>
</template>

<script setup>
import CustomButtons from '@/shared/CustomButtons.vue'
</script>

<style scoped>
.new-listing {
  display: flex;
  align-content: center;
  padding: 20px;
  border: 1px solid red;
  width: 80%;
  margin: 0 auto;
}
.header {
  width: 80%;
  margin: 0 auto;
  display: flex;
  padding: 20px;
}

.header img {
  width: 32px;
}

.header h2 {
  text-align: center;
  width: 50%;
  margin: 0 auto;
}
</style>
