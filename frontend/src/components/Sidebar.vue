<template>
  <div class="w-64 min-h-screen bg-gray-800 text-white p-4">
    <h2 class="text-xl font-semibold mb-6">Clínica</h2>
    <ul class="space-y-2">
      <li>
        <router-link
          v-if="role === 'admin'"
          to="/admin"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </router-link>
        <router-link
          v-else
          to="/user"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </router-link>
      </li>

      <!-- Mostrar para admin y user -->
      <li v-if="role === 'admin' || role === 'user'">
        <router-link
          to="/notas/nueva"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Crear nota clínica
        </router-link>
      </li>

      <li>
        <router-link
          to="/notas"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Ver todas las notas
        </router-link>
      </li>

      <router-link
  to="/descargar-notas"
  class="block px-4 py-2 rounded hover:bg-gray-700 transition"
>
  Descargar Notas
</router-link>

    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const role = ref('');

onMounted(() => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      role.value = user.role?.toLowerCase() || '';
    } catch {
      role.value = '';
    }
  }
});
</script>

<!-- 






<template>
  <div class="w-64 min-h-screen bg-gray-800 text-white p-4">
    <h2 class="text-xl font-semibold mb-6">Clínica</h2>
    <ul class="space-y-2">
      <li>
        <router-link
          :to="role === 'admin' ? '/admin' : '/user'"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </router-link>
      </li>

      <li v-if="role === 'admin'">
        <router-link
          to="/notas/nueva"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Crear nota clínica
        </router-link>
      </li>

      <li>
        <router-link
          :to="role === 'admin' ? '/notas/all' : '/notas'"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Ver todas las notas
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const role = ref('');

onMounted(() => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      role.value = user.role?.toLowerCase() || '';
    } catch {
      role.value = '';
    }
  }
});
</script> -->
