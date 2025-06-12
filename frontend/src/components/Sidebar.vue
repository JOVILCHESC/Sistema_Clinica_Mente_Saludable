<template>
  <div class="w-64 min-h-screen bg-gray-800 text-white p-4">
    <h2 class="text-xl font-semibold mb-6">Clínica</h2>
    <ul class="space-y-2">
      <li>
        <router-link to="/admin" class="block px-4 py-2 rounded hover:bg-gray-700 transition">Dashboard</router-link>
      </li>
      <li><router-link to="/notas/nueva" class="block px-4 py-2 rounded hover:bg-gray-700 transition">Crear nota clínica</router-link>
</li>
<li>
  <router-link to="/notas" class="block px-4 py-2 rounded hover:bg-gray-700 transition">
    Ver todas las notas
  </router-link>
</li>

    </ul>
  </div>
</template>

<script setup>
// No necesitas lógica en este componente aún
</script>
