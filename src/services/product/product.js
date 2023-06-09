import axios from '../axios-config'
import { API_URL } from '@/services/utils'

export function getProducts () {
  return axios.get(API_URL + 'products')
}

export function getProductsDeleted () {
  return axios.get(API_URL + 'products/products-deleted')
}

export function getProductById (id) {
  return axios.get(API_URL + 'products/' + id)
}

export function updateProduct (product) {
  return axios.put(API_URL + 'products/' + product.id, product)
}

export function deleteProduct (id) {
  return axios.delete(API_URL + `products/${id}`)
}

export function getProductsTimeline (productId) {
  return axios.get(API_URL + `products-history/${productId}`)
}

export function createProduct (product) {
  return axios.post(API_URL + 'products', product)
}