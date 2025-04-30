// types/axios.d.ts
import type { AxiosInstance } from 'axios'

export interface NuxtAppAxios {
  $axios: AxiosInstance
}

declare module '#app' {
  interface NuxtApp extends NuxtAppAxios {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends NuxtAppAxios {}
}
