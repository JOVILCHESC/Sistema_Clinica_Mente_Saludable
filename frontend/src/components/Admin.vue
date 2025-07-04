<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded shadow">
      <h1 class="text-xl font-bold mb-2">Panel de Administración</h1>
      <p class="text-lg text-green-700 font-medium">¡Bienvenido, estás autenticado! daAdmin</p>
      <button
        @click="logout"
        class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>

    <div class="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg text-xl font-semibold">
      ¡Tailwind está activo!
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

