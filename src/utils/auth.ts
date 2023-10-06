import axios, { AxiosError, AxiosInstance } from 'axios';

import router from "../router/index";

export const API_call = (): {
  request: AxiosInstance
} => {
  const client = axios.create({
    baseURL: 'https://ecommerce-api-sgjl.onrender.com/api',
    headers: { accept: 'application/json' },
    timeout: 30000,
  })

  // Request interceptors
  client.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Request interceptors
  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        await router.push({ path: `/login` })
      }

      return Promise.reject(error)
    }
  )

  return { request: client }
}