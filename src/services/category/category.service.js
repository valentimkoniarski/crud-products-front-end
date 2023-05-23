import axios from '../axios-config'
import { API_URL } from '@/services/utils'

export function getCategories () {
  return axios.get(API_URL + 'categories')
}

export function createCategory (category) {
  return axios.post(API_URL + 'categories', category)
}

export function deleteCategory (id) {
  return axios.delete(API_URL + `categories/${id}`)
}