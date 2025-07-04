<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Crear cuenta</h2>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-1">Contraseña</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 font-semibold mb-1">Confirmar contraseña</label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>

      <router-link
        to="/login"
        class="block mt-4 text-center text-sm text-blue-600 hover:underline"
      >
        ¿Ya tienes una cuenta? Inicia sesión
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/axiosInstance'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    const res = await api.post('/auth/register', {
      email: email.value,
      password: password.value
    })

    alert('Usuario registrado con éxito')
    router.push('/login')
  } catch (error: any) {
    alert('Error al registrar: ' + error.response?.data?.message || error.message)
  }
}
</script>
