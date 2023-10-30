// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/components/userRegister.vue'),
    meta: { requiresAuth: false }, 
  },
  {
    path: '/login',
    component: () => import('@/components/loginUser.vue'),
    meta: { requiresAuth: false }, 
  },
  {
    path: '/home',
    component: () => import('@/components/homePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    component: () => import('@/components/addCart.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else if (to.path === '/login' || to.path === '/') {
    if (token) {
      next('/home');
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router