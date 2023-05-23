import axios from '../axios-config'
import { API_URL } from '@/services/utils'

export function getProducts () {
  return axios.get(API_URL + 'products')
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

export function createProductImage (productId, formData) {
  return axios.post(API_URL + `products-images/upload/${productId}`, formData)
}

export function loadProductImage (productImageName) {
  return (API_URL + `products-images/download/${productImageName}`)
}

export function createProduct (product) {
  return axios.post(API_URL + 'products', product)
}