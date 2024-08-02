<template>
  <div>
    <header class="header mobile-header">
      <nav>
        <ul>
          <li :class="{ active: isActive('/') }">
            <RouterLink to="/">
              <img :src="isActive('/') ? homeActiveIcon : homeIcon" alt="HomePage" />
            </RouterLink>
          </li>
          <li :class="{ active: isActive('/about') }">
            <RouterLink to="/about">
              <img :src="isActive('/about') ? infoActiveIcon : infoIcon" alt="InfoPage" />
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <header class="header desktop-header">
      <nav>
        <ul>
          <li>
            <img :src="dttLogo" alt="Logo" />
          </li>
          <li :class="{ active: isActive('/') }">
            <RouterLink to="/" :class="{ active: isActive('/') }"> Houses </RouterLink>
          </li>
          <li :class="{ active: isActive('/about') }">
            <RouterLink to="/about" :class="{ active: isActive('/about') }"> About </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink, RouterView } from 'vue-router'
import homeIcon from '@/assets/ic_mobile_navigarion_home@3x.png'
import homeActiveIcon from '@/assets/ic_mobile_navigarion_home_active@3x.png'
import infoIcon from '@/assets/ic_mobile_navigarion_info@3x.png'
import infoActiveIcon from '@/assets/ic_mobile_navigarion_info_active@3x.png'
import dttLogo from '@/assets/img_logo_dtt@3x.png'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
.header {
  display: flex;
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

.mobile-header {
  display: flex;
}

.desktop-header {
  display: none;
}

/* desktop */
@media screen and (min-width: 1024px) {
  .mobile-header {
    display: none;
  }
  .desktop-header {
    display: flex;
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
    width: 100px;
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
