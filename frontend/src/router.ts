// // src/router.ts
// import { createRouter, createWebHistory } from 'vue-router'
// import LoginView from './components/Login.vue'
// import Dashboard from './pages/Dashboard.vue'
// import NoteForm from './components/NoteForm.vue'
// import NotesList from './components/NotesList.vue'
// import UserDashboard from './pages/UserDashboard.vue'

// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', name: 'Login', component: LoginView },
//   { path: '/user', name: 'User', component: UserDashboard },
//   { path: '/admin', name: 'Admin', component: Dashboard },
//   { path: '/notas/nueva', name: 'CrearNota', component: NoteForm },
//   { path: '/notas', name: 'VerNotas', component: NotesList }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router

















import { createRouter, createWebHistory } from 'vue-router';
import UserDashboard from './pages/UserDashboard.vue';
// import Admin from './components/Admin.vue';
import NotasList from './components/NotesList.vue';     // Debes crear este componente o ajustar nombre
import NotasNueva from './components/NoteForm.vue';   // Debes crear este componente o ajustar nombre
import Admin from './pages/Dashboard.vue';
import Login from './components/Login.vue';
import DescargarNotas from './components/DescargarNotas.vue';

function getUserRole(): string | null {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.role || null;
  } catch {
    return null;
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/notas',
    name: 'NotasList',
    component: NotasList,
    meta: { requiresAuth: true }
  },
  {
    path: '/notas/nueva',
    name: 'NotasNueva',
    component: NotasNueva,
    meta: { requiresAuth: true }
  },
  {
    path: '/descargar-notas',
    name: 'DescargarNotas',
    component: DescargarNotas,
    meta: { requiresAuth: true }  // si usas autenticación
  },
  {
  path: '/register',
  name: 'Register',
  component: () => import('../src/components/Register.vue')
  },
  {
    path: '/',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = getUserRole();

  if (to.meta.requiresAuth) {
    if (!role) {
      return next('/login');
    }
    if (to.meta.role && to.meta.role !== role) {
      if (role === 'admin') return next('/admin');
      if (role === 'user') return next('/user');
      return next('/login');
    }
  }
  next();
});

export default router;

