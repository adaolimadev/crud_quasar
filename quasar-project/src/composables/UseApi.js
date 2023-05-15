import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const response = await api.get(url)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getById = async (id) => {
    try {
      const response = await api.get(`${url}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const post = async (payload) => {
    try {
      const response = await api.post(url, payload)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (payload) => {
    try {
      const { data } = await api.put(`${url}/${payload.id}`, payload)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
