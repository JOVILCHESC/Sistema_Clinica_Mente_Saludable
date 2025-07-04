<!-- 

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Iniciar sesión</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Ingresar
        </button>

        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../utils/axiosInstance';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) router.push('/admin');
});

const login = async () => {
  try {
    error.value = '';

    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    if (res.data?.token && res.data?.user) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      email.value = '';
      password.value = '';
      router.push('/admin');
    } else {
      error.value = 'Respuesta inesperada del servidor.';
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión';
  }
};
</script> -->



















<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Iniciar sesión</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
<router-link
  to="/register"
  class="mt-4 flex items-center text-blue-600 hover:underline text-sm justify-center"
>
  <span class="mr-1">¿No tienes cuenta?</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
  </svg>
  <span class="ml-1 font-semibold">Regístrate</span>
</router-link>

        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../utils/axiosInstance';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      const role = user.role ? user.role.toLowerCase() : '';

      console.log('Usuario cargado en onMounted:', user);
      console.log('Rol cargado en onMounted:', role);

      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'user') {
        router.push('/user');
      }
    } catch {
      // En caso de error al parsear o no tener rol, limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});

const login = async () => {
  try {
    error.value = '';

    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    console.log('Respuesta completa del login:', res.data);
    const user = res.data.user;
    const role = user && user.role ? user.role.toLowerCase() : '';

    console.log('Usuario recibido:', user);
    console.log('Rol recibido:', role);

    if (res.data?.token && user) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      email.value = '';
      password.value = '';

      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'user') {
        router.push('/user');
      } else {
        error.value = 'Rol de usuario no reconocido.';
      }
    } else {
      error.value = 'Respuesta inesperada del servidor.';
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión';
  }
};
</script>
