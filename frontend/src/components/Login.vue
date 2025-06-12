<!-- <template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Ingresar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

// Si ya hay token, redirigir automáticamente a /admin
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) router.push('/admin');
});

const login = async () => {
  try {
    error.value = ''; // Limpiar error anterior

    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    });

    if (res.data && res.data.token && res.data.user) {
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
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #222;
}

.login-container h2 {
  margin-bottom: 20px;
  color: #333;
}

form div {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #333;
}

.error {
  color: red;
  margin-top: 10px;
}
</style> -->


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
</script>
