<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 text-center">Notas Guardadas</h2>

    <ul class="space-y-4">
      <li
        v-for="note in notes"
        :key="note.id"
        class="border border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition"
      >
        <h3 class="text-lg font-semibold text-blue-600">{{ note.title }}</h3>
        <p class="text-gray-700 mt-2 whitespace-pre-line">{{ note.body }}</p>
        <p class="text-sm text-gray-500 mt-1 text-right">🕒 {{ new Date(note.createdAt).toLocaleString() }}</p>
      </li>
    </ul>

    <p v-if="notes.length === 0" class="text-gray-500 text-center mt-8">No hay notas aún.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import api from '../utils/axiosInstance' // Asegúrate de importar tu axiosInstance

interface Note {
  id: string
  therapistId: string
  title: string
  body: string
  createdAt: string
}

export default defineComponent({
  setup() {
    const notes = ref<Note[]>([])

    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes') // HTTPS y con token automáticamente
        notes.value = res.data
      } catch (error) {
        console.error('Error al obtener notas:', error)
      }
    }

    onMounted(fetchNotes)

    return {
      notes
    }
  }
})
</script>
