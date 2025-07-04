<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Nabvar.vue'; // Corrige aquí si antes estaba mal
</script>
