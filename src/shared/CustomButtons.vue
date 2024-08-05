<template>
  <!-- A button element with dynamic classes and inline styles -->
  <button :class="['custom-button', buttonClass]" :style="buttonStyle" @click="handleClick">
    <!-- Slot for custom content inside the button -->
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// Define the properties that can be passed to the button
const props = defineProps({
  buttonClass: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#EB5440' // Default button color
  },
  borderRadius: {
    type: String,
    default: '0' // Default border radius
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function,
    default: () => {} // Default click handler
  }
})

// Function to handle button clicks
const handleClick = () => {
  props.onClick()
}

// Inline styles based on props for dynamic styling
const buttonStyle = {
  backgroundColor: props.color,
  color: 'white',
  borderRadius: props.borderRadius
}
</script>

<style scoped>
/* Basic styles for the button */
.custom-button {
  padding: 15px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
  width: 50%;
}
</style>
