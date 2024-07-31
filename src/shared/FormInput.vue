<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :type="type"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
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
