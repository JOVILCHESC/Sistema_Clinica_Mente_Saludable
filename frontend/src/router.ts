// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './components/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import NoteForm from './components/NoteForm.vue'
import NotesList from './components/NotesList.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/admin', name: 'Admin', component: Dashboard },
  { path: '/notas/nueva', name: 'CrearNota', component: NoteForm },
  { path: '/notas', name: 'VerNotas', component: NotesList }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
