import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { API_URL } from '@/services/utils'

export function login (user) {
  console.log(user)
  return axios
    .post(API_URL + 'login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response)
      if (response.data) {

        const userInfo = 'Bearer ' + response.data.token

        localStorage.setItem('user', JSON.stringify(userInfo))
      }

      return response.data
    }).catch(error => {
      console.log(error)
    })
}

export function logout () {
  localStorage.removeItem('user')
}

export function getCurrentUser () {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    const decodedToken = jwt_decode(user)
    console.log(decodedToken)
    return {
      id: decodedToken.id,
      email: decodedToken.email
    }
  } else {
    return null
  }
}
