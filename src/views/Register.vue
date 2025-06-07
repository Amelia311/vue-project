<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
      <h2 class="text-3xl font-bold text-center text-blue-500 mb-6">
        Daftar Akun Baru
      </h2>
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Nama -->
        <div>
          <label class="block mb-1 text-sm font-semibold text-gray-700">Nama</label>
          <input
            v-model="name"
            type="text"
            placeholder="Nama lengkap"
            :class="[
              'w-full px-4 py-2 rounded-xl focus:outline-none transition-all',
              nameTouched && !name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
            ]"
          />
          <p v-if="nameTouched && !name" class="text-red-500 text-sm mt-1">Nama tidak boleh kosong.</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block mb-1 text-sm font-semibold text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            :class="[
              'w-full px-4 py-2 rounded-xl focus:outline-none transition-all',
              emailTouched && !isValidEmail(email) ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
            ]"
          />
          <p v-if="emailTouched && !isValidEmail(email)" class="text-red-500 text-sm mt-1">Email tidak valid.</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-1 text-sm font-semibold text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            :class="[
              'w-full px-4 py-2 rounded-xl focus:outline-none transition-all',
              passwordTouched && password.length < 6 ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
            ]"
          />
          <p v-if="passwordTouched && password.length < 6" class="text-red-500 text-sm mt-1">Password minimal 6 karakter.</p>
        </div>

        <!-- Tombol -->
        <button
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-300 text-white py-2 rounded-xl font-semibold transition-all shadow-md disabled:opacity-50"
        >
          {{ loading ? 'Mendaftarkan...' : 'Daftar' }}
        </button>

        <!-- Link Login -->
        <p class="text-sm text-center mt-4">
          Sudah punya akun?
          <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const nameTouched = ref(false)
const emailTouched = ref(false)
const passwordTouched = ref(false)
const loading = ref(false)
const router = useRouter()

const isValidEmail = (val) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(val)
}

const handleRegister = async () => {
  // Tandai semua field sebagai "sudah disentuh"
  nameTouched.value = true
  emailTouched.value = true
  passwordTouched.value = true

  // Validasi sederhana
  if (!name.value || !isValidEmail(email.value) || password.value.length < 6) {
    return
  }

  loading.value = true
  try {
    await axios.post('http://127.0.0.1:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    alert('Registrasi berhasil! Silakan login.')
    router.push('/login')
  } catch (err) {
    alert('Registrasi gagal. Coba lagi.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
