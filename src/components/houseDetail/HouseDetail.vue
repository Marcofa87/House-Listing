<template>
  <main>
    <div class="house-detail-container">
      <div class="house-detail-images">
        <div>
          <img src="../../assets/ic_back_white@3x.png" alt="back button" />
        </div>
        <div>
          <img src="../../assets/ic_edit@3x.png" alt="edit button" />
          <img src="../../assets/ic_delete@3x.png" alt="back button" />
        </div>
      </div>
      <div>
        <div>
          <h2>Stokvissat 132</h2>
          <img src="../../assets/ic_location@3x.png" alt="location icon" />
          <p>AA Amsterdam</p>
        </div>
        <div>
          <div>
            <img src="../../assets/ic_price@3x.png" alt="euro icon" />
            <p>500.000</p>
          </div>
          <div>
            <img src="../../assets/ic_size@3x.png" alt="size icon" />
            <p>120mt2</p>
          </div>
          <div>
            <img src="../../assets/ic_construction_date@3x.png" alt="size icon" />
            <p>Built in 1990</p>
          </div>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos culpa officia
            impedit eos sit hic minus! Perferendis fugiat, harum, quas odio id sunt ratione sed,
            labore in fugit fuga!
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHouseDetailStore } from '@/stores/houseDetailStore'

const houseDetailStore = useHouseDetailStore()
console.log(houseDetailStore)
</script>

<style scoped>
.house-detail-container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.house-detail-images {
  display: flex;
  justify-content: space-between;
}
</style>
