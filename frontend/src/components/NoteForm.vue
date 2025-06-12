<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Crear Nota Clínica</h2>
    <form @submit.prevent="submitNote" class="space-y-4">
      <input
        v-model="title"
        type="text"
        placeholder="Título de la nota"
        class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        v-model="body"
        placeholder="Contenido de la nota"
        class="w-full border border-gray-300 p-3 rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      ></textarea>
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
      >
        Guardar Nota
      </button>
      <p v-if="message" :class="success ? 'text-green-600' : 'text-red-600'" class="font-medium mt-2">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  setup() {
    const title = ref<string>('')
    const body = ref<string>('')
    const message = ref<string>('')
    const success = ref<boolean>(false)

    const submitNote = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          message.value = 'No se encontró el token de autenticación.'
          success.value = false
          return
        }

        await axios.post('https://localhost:5000/api/notes', {
  title: title.value,
  body: body.value
}, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})


        title.value = ''
        body.value = ''
        message.value = '✅ Nota guardada exitosamente.'
        success.value = true
      } catch (error) {
        console.error('Error al guardar nota:', error)
        message.value = '❌ Error al guardar la nota.'
        success.value = false
      }
    }

    return {
      title,
      body,
      message,
      success,
      submitNote
    }
  }
})
</script>
