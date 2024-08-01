<template>
  <button :class="['custom-button', buttonClass]" :style="buttonStyle" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonClass: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#EB5440'
  },
  borderRadius: {
    type: String,
    default: '0'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function,
    default: () => {}
  }
})

const handleClick = () => {
  props.onClick()
}

const buttonStyle = {
  backgroundColor: props.color,
  color: 'white',
  borderRadius: props.borderRadius
}
</script>

<style scoped>
.custom-button {
  padding: 15px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
  width: 50%;
}
</style>
