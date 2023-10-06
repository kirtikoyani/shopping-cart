// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/components/userRegister.vue'),
  },
  {
    path: '/login',
    component: () => import('@/components/loginUser.vue'),
  },
  {
    path: '/home',
    component: () => import('@/components/homePage.vue'),
  },
  {
    path: '/cart',
    component: () => import('@/components/addCart.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router