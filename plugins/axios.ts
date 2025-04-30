// plugins/axios.ts
import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  axiosInstance.interceptors.request.use(config => {
    if (process.client) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  nuxtApp.provide('axios', axiosInstance)
})
