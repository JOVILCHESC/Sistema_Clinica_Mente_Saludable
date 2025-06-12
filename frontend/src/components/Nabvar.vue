<template>
  <nav class="bg-white shadow px-4 py-3 flex items-center justify-between">
    <div class="text-xl font-semibold text-blue-600">Clínica</div>

    <ul class="flex items-center space-x-6">
      <li>
        <router-link to="/" class="text-gray-700 hover:text-blue-500 transition">Inicio</router-link>
      </li>
      <li>
        <router-link to="/admin" class="text-gray-700 hover:text-blue-500 transition">Panel</router-link>
      </li>
      <li v-if="isLoggedIn">
        <button
          @click="logout"
          class="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition text-sm"
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token');
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>
