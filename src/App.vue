<template>
  <div>
    <!-- Mobile Header -->
    <header class="header mobile-header">
      <nav>
        <ul>
          <!-- Home Link -->
          <li :class="{ active: isActive('/') }">
            <RouterLink to="/">
              <img :src="isActive('/') ? homeActiveIcon : homeIcon" alt="HomePage" />
            </RouterLink>
          </li>
          <!-- About Link -->
          <li :class="{ active: isActive('/about') }">
            <RouterLink to="/about">
              <img :src="isActive('/about') ? infoActiveIcon : infoIcon" alt="InfoPage" />
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Desktop Header -->
    <header class="header desktop-header">
      <nav>
        <ul>
          <!-- Logo -->
          <li>
            <img :src="dttLogo" alt="Logo" />
          </li>
          <!-- Houses Link -->
          <li :class="{ active: isActive('/') }">
            <RouterLink to="/" :class="{ active: isActive('/') }"> Houses </RouterLink>
          </li>
          <!-- About Link -->
          <li :class="{ active: isActive('/about') }">
            <RouterLink to="/about" :class="{ active: isActive('/about') }"> About </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Router View: Displays the matched component for the current route -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink, RouterView } from 'vue-router'
// Importing icons and logo assets
import homeIcon from '@/assets/ic_mobile_navigarion_home@3x.png'
import homeActiveIcon from '@/assets/ic_mobile_navigarion_home_active@3x.png'
import infoIcon from '@/assets/ic_mobile_navigarion_info@3x.png'
import infoActiveIcon from '@/assets/ic_mobile_navigarion_info_active@3x.png'
import dttLogo from '@/assets/img_logo_dtt@3x.png'

// Use Vue Router to get the current route
const route = useRoute()

// Function to determine if the current route matches a given path
const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
.header {
  display: flex;
  position: fixed;
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
  margin: 10px;
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

/* Mobile header styles */
.mobile-header {
  display: flex;
}

.desktop-header {
  display: none;
}

/* Styles for screens 1024px and wider (desktop) */
@media screen and (min-width: 1024px) {
  .mobile-header {
    display: none;
  }
  .desktop-header {
    display: flex;
  }

  .header {
    height: 80px;
    position: absolute;
    top: 0;
  }

  ul {
    justify-content: flex-start;
    gap: 40px;
  }

  ul li {
    display: flex;
    justify-content: flex-start;
    width: 15%;
  }

  ul img {
    width: 110px;
  }

  .desktop-header a {
    color: gray;
    text-decoration: none;
  }

  .desktop-header a.active {
    color: black;
    font-weight: bold;
  }
}
</style>
