// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import UserDashboard from '../pages/UserDashboard.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/user', component: UserDashboard },
  { path: '/admin', component: Dashboard }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
