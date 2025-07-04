<!-- 

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
        <button
          @click="descargarNota(note.id)"
          class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Descargar
        </button>
      </li>
    </ul>

    <p v-if="notes.length === 0" class="text-gray-500 text-center mt-8">No hay notas aún.</p>
  </div>
</template>

 <script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import api from '../utils/axiosInstance'
// import * as jwtDecode from 'jwt-decode'
import { jwtDecode } from "jwt-decode";
import CryptoJS from 'crypto-js'

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
        const res = await api.get('/notes')
        console.log('Respuesta API /notes:', res.data)
        notes.value = res.data
      } catch (error) {
        console.error('Error al obtener notas:', error)
      }
    }

    const decryptWithToken = (encryptedText: string, token: string) => {
      const bytes = CryptoJS.AES.decrypt(encryptedText, token)
      return bytes.toString(CryptoJS.enc.Utf8)
    }

    const descargarNota = async (id: string) => {
      try {
        const res = await api.get(`/notes/download/${id}`)
        const { encryptedTitle, encryptedBody, token } = res.data

        const decoded: any = jwtDecode(token)
        console.log('Token válido hasta:', new Date(decoded.exp * 1000))

        const title = decryptWithToken(encryptedTitle, token)
        const body = decryptWithToken(encryptedBody, token)

        alert(`Título: ${title}\n\nContenido:\n${body}`)
      } catch (error) {
        alert('Error al descargar la nota: ' + (error as Error).message)
      }
    }

    onMounted(fetchNotes)

    return {
      notes,
      descargarNota
    }
  }
})
</script> 

 -->






<!-- 

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
        <button
          @click="descargarNota(note.id)"
          class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Descargar
        </button>
      </li>
    </ul>

    <p v-if="notes.length === 0" class="text-gray-500 text-center mt-8">No hay notas aún.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import api from '../utils/axiosInstance'
import { jwtDecode } from "jwt-decode";// Importación corregida
import CryptoJS from 'crypto-js'

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

    // En fetchNotes no desciframos porque backend ya envía datos descifrados
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        console.log('Respuesta API /notes:', res.data)
        notes.value = res.data
      } catch (error) {
        console.error('Error al obtener notas:', error)
      }
    }

    // Solo usamos esta función para notas cifradas que vienen en /notes/download/:id
    const decryptWithToken = (encryptedText: string, token: string) => {
      const bytes = CryptoJS.AES.decrypt(encryptedText, token)
      return bytes.toString(CryptoJS.enc.Utf8)
    }

    const descargarNota = async (id: string) => {
      try {
        const res = await api.get(`/notes/download/${id}`)
        const { encryptedTitle, encryptedBody, token } = res.data

        const decoded: any = jwtDecode(token)
        console.log('Token válido hasta:', new Date(decoded.exp * 1000))

        const title = decryptWithToken(encryptedTitle, token)
        const body = decryptWithToken(encryptedBody, token)

        alert(`Título: ${title}\n\nContenido:\n${body}`)
      } catch (error) {
        alert('Error al descargar la nota: ' + (error as Error).message)
      }
    }

    onMounted(fetchNotes)

    return {
      notes,
      descargarNota
    }
  }
})
</script> -->











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
        <button
          @click="descargarNota(note.id)"
          class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Descargar
        </button>
      </li>
    </ul>

    <p v-if="notes.length === 0" class="text-gray-500 text-center mt-8">No hay notas aún.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import api from '../utils/axiosInstance'
import { jwtDecode } from "jwt-decode";// Importación corregida // Importación corregida sin llaves
import CryptoJS from 'crypto-js'

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

    // Clave debe coincidir con la que usas en backend para cifrar
    const claveSecreta = 'claveSecreta123456'

    // Descifra texto cifrado con la clave
    const decrypt = (cipherText: string, key: string) => {
      const bytes = CryptoJS.AES.decrypt(cipherText, key)
      return bytes.toString(CryptoJS.enc.Utf8)
    }

    // Ahora descifra cada nota al obtenerla del backend
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        // Descifrar cada título y cuerpo con la clave
        notes.value = res.data.map((note: any) => ({
          ...note,
          title: decrypt(note.title, claveSecreta),
          body: decrypt(note.body, claveSecreta),
        }))
        console.log('Notas descifradas:', notes.value)
      } catch (error) {
        console.error('Error al obtener notas:', error)
      }
    }

    // Para descargar nota individual, usa el token y la función decryptWithToken
    const decryptWithToken = (encryptedText: string, token: string) => {
      const bytes = CryptoJS.AES.decrypt(encryptedText, token)
      return bytes.toString(CryptoJS.enc.Utf8)
    }

    const descargarNota = async (id: string) => {
      try {
        const res = await api.get(`/notes/download/${id}`)
        const { encryptedTitle, encryptedBody, token } = res.data

        const decoded: any = jwtDecode(token)
        console.log('Token válido hasta:', new Date(decoded.exp * 1000))

        const title = decryptWithToken(encryptedTitle, token)
        const body = decryptWithToken(encryptedBody, token)

        alert(`Título: ${title}\n\nContenido:\n${body}`)
      } catch (error) {
        alert('Error al descargar la nota: ' + (error as Error).message)
      }
    }

    onMounted(fetchNotes)

    return {
      notes,
      descargarNota
    }
  }
})
</script>
