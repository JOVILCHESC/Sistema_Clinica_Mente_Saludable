<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl mb-6 font-bold text-center">Descargar y descifrar notas</h1>

    <button
      @click="descargarNotas"
      class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded text-lg mb-6"
    >
      Descargar notas cifradas
    </button>

    <div v-if="notasCifradas.length > 0">
      <input
        v-model="clave"
        type="password"
        placeholder="Introduce la clave para descifrar"
        class="w-full p-2 border rounded mb-4"
      />

      <button
        @click="descifrarNotas"
        class="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        Descifrar notas
      </button>
    </div>

    <div v-if="notasDescifradas.length > 0" class="mt-6 space-y-4">
      <div
        v-for="(nota, index) in notasDescifradas"
        :key="index"
        class="p-4 border rounded bg-gray-50 text-black"
      >
        <h3 class="font-semibold text-lg">{{ nota.title }}</h3>
        <p>{{ nota.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../utils/axiosInstance';
import CryptoJS from 'crypto-js';

const notasCifradas = ref([]);
const notasDescifradas = ref([]);
const clave = ref('');

const descargarNotas = async () => {
  try {
    console.log('Intentando descargar notas...');
    const res = await api.get('/notes'); // Cambia esta ruta si tienes otra para notas cifradas completas
    console.log('Notas descargadas:', res.data);
    notasCifradas.value = res.data;
    notasDescifradas.value = [];
  } catch (error: any) {
    console.error('Error al descargar notas:', error);
    alert('Error al descargar notas: ' + error.message);
  }
};

const descifrarNotas = () => {
  if (!clave.value) {
    alert('Introduce la clave para descifrar');
    return;
  }

  try {
    console.log('Clave ingresada para descifrar:', clave.value);
    notasDescifradas.value = notasCifradas.value.map((nota: any) => {
      console.log('Nota cifrada:', nota);
      const titleBytes = CryptoJS.AES.decrypt(nota.title, clave.value);
      const bodyBytes = CryptoJS.AES.decrypt(nota.body, clave.value);
      const title = titleBytes.toString(CryptoJS.enc.Utf8);
      const body = bodyBytes.toString(CryptoJS.enc.Utf8);
      console.log('Nota descifrada:', { title, body });
      return {
        title,
        body
      };
    });
  } catch (error) {
    console.error('Error al descifrar notas:', error);
    alert('Error al descifrar notas. Clave incorrecta?');
  }
};
</script>
