import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'


const routes = [
    { path: '/', redirect: '/Dashboard' },
    { path: '/Dashboard', component: Dashboard },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

// Middleware untuk auth
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
      next('/Login')
    } else {
      next()
    }
  })

export default router