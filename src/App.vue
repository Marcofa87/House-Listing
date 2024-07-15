<template>
  <header class="header">
    <nav>
      <ul>
        <li :class="{ active: $route.path === '/' }">
          <RouterLink to="/">
            <img :src="isActive('/') ? homeActiveIcon : homeIcon" alt="HomePage" />
          </RouterLink>
        </li>
        <li :class="{ active: $route.path === '/about' }">
          <RouterLink to="/about">
            <img :src="isActive('/about') ? infoActiveIcon : infoIcon" alt="InfoPage" />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute, RouterLink, RouterView } from 'vue-router'
import homeIcon from './assets/ic_mobile_navigarion_home@3x.png'
import homeActiveIcon from './assets/ic_mobile_navigarion_home_active@3x.png'
import infoIcon from './assets/ic_mobile_navigarion_info@3x.png'
import infoActiveIcon from './assets/ic_mobile_navigarion_info_active@3x.png'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
header {
  display: flex;
  /* position: fixed; */
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
}

nav {
  margin: 0 auto;
  height: 60px;
  width: 80%;
}

ul {
  display: flex;
  justify-content: space-around;
}

li {
  list-style: none;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

img {
  height: 50px;
  width: 50px;
}
</style>
