import { createRouter, createWebHistory } from 'vue-router'
import Login from '../frontend/src/components/Login.vue'
import Admin from '../frontend/src/components/Admin.vue'
import User from '../frontend/src/components/User.vue'
const routes = [
  { path: '/', component: Login },
  { path: '/user', component: User },
  { path: '/admin', component: Admin }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
