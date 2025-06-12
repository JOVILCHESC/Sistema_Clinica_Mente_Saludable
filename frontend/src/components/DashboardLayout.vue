<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar fijo -->
    <Sidebar />

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar superior -->
      <Navbar />

      <!-- Contenido dinámico -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import Navbar from './Nabvar.vue'; // ✅ corregido el nombre del archivo
</script>

<!-- 
<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <router-view />
      <Navbar />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Navbar from './Nabvar.vue';

</script> -->
