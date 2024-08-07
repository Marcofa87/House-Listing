<template>
  <div class="about-container">
    <div class="about-header-container">
      <h1>About</h1>
    </div>
    <div class="about-text-container">
      <h2>About DTT Real Estate</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi quaerat a amet
        dolorum qui, in, voluptatem sed quam numquam voluptas voluptate praesentium impedit eius
        repellat et esse? Consectetur, reprehenderit! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. A libero accusantium delectus, quasi architecto beatae voluptatibus illum
        adipisci quae quibusdam totam, eos, deleniti officia. Fugit natus libero ad dolorem nobis!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos explicabo necessitatibus
        debitis labore aperiam iste, atque consectetur velit, odio sunt vero ipsam autem. Corrupti
        officia accusantium voluptate asperiores voluptates unde?
      </p>
    </div>
    <div class="about-footer-container">
      <h2>Design and development</h2>
      <div class="about-logo-image-container">
        <div class="about-logo-container">
          <img :src="DTTLogo" alt="Dtt logo" />
        </div>
        <div class="about-link-container">
          <p>By DTT</p>
          <a href="https://www.d-tt.nl" target="_blank">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DTTLogo from '@/assets/img_logo_dtt@3x.png'
</script>

<style scoped>
.about-container {
  padding: 80px;
}

.about-text-container p {
  margin-bottom: 20px;
}

.about-header-container,
.about-text-container,
.about-footer-container {
  margin: 50px 0;
}

.about-text-container h2,
.about-footer-container h2 {
  margin-bottom: 50px;
}

.about-header-container h1 {
  text-align: center;
}

.about-logo-container {
  margin-right: 20px;
}

.about-logo-container img {
  width: 100px;
}

.about-link-container a {
  color: var(--color-hyperlink);
}

.about-logo-image-container {
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  .about-container {
    padding: 150px;
  }
  h1 {
    display: none;
  }
}
</style>
