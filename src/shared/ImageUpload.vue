<template>
  <div class="form-group">
    <label for="image">Upload Picture (PNG or JPG)</label>
    <input
      type="file"
      id="image"
      ref="fileInput"
      @change="handleImageUpload"
      accept="image/png, image/jpeg"
      style="display: none"
    />
    <div class="upload-label" @click="$refs.fileInput.click()">
      <img v-if="!imagePreview" src="../../assets/ic_upload@3x.png" alt="Upload" />
      <div v-else class="image-container">
        <img :src="imagePreview" alt="Preview" class="image-preview" />
        <div class="remove-image" @click.stop="removeImage">×</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:image'])

const imagePreview = ref<string | null>(null)

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!(target.files && target.files.length > 0)) {
    return
  }
  const file = target.files[0]
  emit('update:image', file)

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  emit('update:image', null)
  imagePreview.value = null
}
</script>

<style scoped>
.upload-label {
  border: 3px grey dashed;
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.upload-label img {
  object-fit: cover;
}

.image-container {
  position: relative;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}

.remove-image {
  position: absolute;
  top: -15px;
  right: 0;
  transform: translate(50%, -50%);
  width: 25px;
  height: 25px;
  background-color: rgb(255, 255, 255);
  color: rgb(153, 153, 153);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  z-index: 10;
  font-size: 1.5rem;
}
</style>
