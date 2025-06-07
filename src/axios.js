// src/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // URL Laravel
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // kalau pakai Sanctum / cookie-based auth
})

export default api