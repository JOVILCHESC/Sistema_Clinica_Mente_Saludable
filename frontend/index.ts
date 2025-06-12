import { createRouter, createWebHistory } from 'vue-router'
import Login from '../frontend/src/components/Login.vue'
import Admin from '../frontend/src/components/Admin.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
