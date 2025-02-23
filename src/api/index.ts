import axios from 'axios'

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const BASE_URL = 'https://api.unsplash.com'

const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${API_KEY}`,
  },
})

export const unsplashApi = {
  async searchPhotos(query: string, perPage: number = 8) {
    try {
      const response = await baseApi.get('/search/photos', {
        params: {
          query,
          per_page: perPage,
          order_by: 'latest',
        },
      })
      return response.data.results
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async getPhotos(page: number = 1, perPage: number = 8) {
    try {
      const response = await baseApi.get('/photos', {
        params: {
          page: page,
          per_page: perPage,
        },
      })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },
}

export default baseApi
