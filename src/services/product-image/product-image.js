import axios from '../axios-config'
import { API_URL } from '@/services/utils'

export function getAllByProductId (productId) {
  return axios.get(API_URL + `products-images/${productId}`)
}

export function deleteImage (productImageId) {
  return axios.delete(API_URL + `products-images/${productImageId}`)
}

export function setPrincipalImage (productId, productImageId) {
  return axios.put(API_URL + `products-images/${productId}/${productImageId}/image-principal`)
}