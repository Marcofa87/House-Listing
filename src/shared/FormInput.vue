<template>
  <!-- Form group containing a label and input field -->
  <div class="form-group">
    <label :for="id">{{ label }}{{ required ? '*' : '' }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import '../assets/base.css'
import '../assets/main.css'

// Define the properties for the input field
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text' // Default input type
  },
  placeholder: {
    type: String,
    default: '' // Default placeholder text
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: '' // Default value for the input field
  }
})

// Emit an event to update the model value when input changes
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
/* Styles for the form group, label, and input field */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: lighter;
}

input {
  width: 100%;
  padding: 15px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
}
</style>
