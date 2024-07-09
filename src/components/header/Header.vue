<template>
  <div>
    <div class="header">
      <h1>Houses</h1>
      <RouterLink to="/about">
        <img src="../../assets/ic_plus_grey@3x.png" alt="Edit listing" />
      </RouterLink>
    </div>
    <div class="input">
      <input type="text" placeholder="Search for a house" />
    </div>
    <div class="buttons"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.input {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input {
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  background: #c3c3c3;
}

.buttons {
  max-width: 90%;
  margin: 50px auto;
}
</style>
