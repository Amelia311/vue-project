
<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-5xl font-bold text-center text-blue-900 mb-5">Mini Notes</h1>

    <!-- Logout -->
    <router-link to="/login"><div class="flex justify-end mb-4">
    <button @click="logout" class="bg-pink-300 hover:bg-pink-400 text-white px-3 py-1 rounded-xl font-semibold shadow-md">Keluar</button>
    </div>
    </router-link>
        <!-- Form -->
        <form @submit.prevent="saveNote" class="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <input v-model="note.title" type="text" placeholder="Judul Catatan"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" />
          <textarea v-model="note.content" rows="4" placeholder="Isi catatan..."
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
          <button
            class="w-full bg-blue-600 hover:bg-blue-400 text-white py-2 rounded-xl font-semibold transition-all shadow-md">
            {{ editingIndex === null ? 'Tambah Catatan' : 'Update Catatan' }}
          </button>
        </form>
  
        <!-- Notes List -->
        <div v-if="notes.length" class="space-y-4">
          <div v-for="(item, index) in notes" :key="index"
            class="bg-white p-3 rounded-xl shadow-md flex justify-between items-start">
            <div>
              <h2 class="text-lg font-bold text-blue-700">{{ item.title }}</h2>
              <p class="text-gray-600 whitespace-pre-wrap">{{ item.content }}</p>
            </div>
            <div class="space-x-2">
              <button @click="editNote(index)"
                class="bg-pink-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-xl font-semibold text-sm">
                Edit
              </button>
              <button @click="deleteNote(index)"
                class="bg-blue-400 hover:bg-red-600 text-white px-3 py-1 rounded-xl font-semibold text-sm">
                Hapus
              </button>
            </div>
          </div>
        </div>
        <p v-else class="text-center text-gray-600">Belum ada catatan.</p>
      </div>
    </div>
  </template>
   
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const notes = ref([])
  const note = ref({ title: '', content: '' })
  const editingIndex = ref(null)
  const editingNoteId = ref(null) // untuk simpan id catatan kalau edit
  
  // Fungsi ambil data dari API Laravel
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/note')
      notes.value = res.data
    } catch (error) {
      console.error('Gagal fetch notes:', error)
    }
  }
  
  // Fungsi simpan (tambah atau update) catatan ke API Laravel
  const saveNote = async () => {
    if (!note.value.title || !note.value.content) {
      alert('Judul dan isi wajib diisi!')
      return
    }
  
    try {
      if (editingIndex.value === null) {
        // Tambah catatan baru
        const res = await axios.post('http://127.0.0.1:8000/api/note', note.value)
        notes.value.push(res.data)
      } else {
        // Update catatan existing
        const id = notes.value[editingIndex.value].id
        const res = await axios.put(`http://127.0.0.1:8000/api/note/${id}`, note.value)
        notes.value[editingIndex.value] = res.data
        editingIndex.value = null
      }
      note.value = { title: '', content: '' }
    } catch (error) {
      console.error('Gagal simpan note:', error)
    }
  }
  
  const editNote = (index) => {
    note.value = { ...notes.value[index] }
    editingIndex.value = index
  }
  
  const deleteNote = async (index) => {
    if (confirm('Yakin ingin menghapus catatan ini?')) {
      try {
        const id = notes.value[index].id
        await axios.delete(`http://127.0.0.1:8000/api/note/${id}`)
        notes.value.splice(index, 1)
        if (editingIndex.value === index) {
          note.value = { title: '', content: '' }
          editingIndex.value = null
        }
      } catch (error) {
        console.error('Gagal hapus note:', error)
      }
    }
  }
  
  // Panggil fetchNotes saat komponen mount
  onMounted(() => {
    fetchNotes()
  })
  </script>
  


  <style scoped>
  /* Animasi sederhana */
  </style>
  