import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { API_URL } from '@/services/utils'

export function login (user) {
  return axios.post(API_URL + 'login', user)
}

export function register (user) {
  return axios
    .post(API_URL + 'registration', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    })
    .then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return error
    })
}

export function logout () {
  localStorage.removeItem('user')
}

/*
// TODO: check if this is needed
export function getCurrentUser () {

  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    const decodedToken = jwt_decode(user)
    console.log('decodedToken')
    console.log(decodedToken)
    console.log('decodedToken')
    return {
      id: decodedToken.id,
      email: decodedToken.email
    }
  } else {
    return null
  }
}
*/
