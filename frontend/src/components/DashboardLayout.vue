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
