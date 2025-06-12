// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: Dashboard }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
