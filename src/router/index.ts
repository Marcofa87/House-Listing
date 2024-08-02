import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL), // Correctly reference environment variable
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/house/:id',
      name: 'house-detail',
      component: () => import('../views/HouseDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/new-listing',
      name: 'new-listing',
      component: () => import('../views/NewListing.vue')
    },
    {
      path: '/edit-listing/:id',
      name: 'edit-listing',
      component: () => import('../views/EditView.vue')
    }
  ]
})

export default router
