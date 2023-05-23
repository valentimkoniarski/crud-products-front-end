// cria um interceptor para interceptar as requisições e respostas
// e adicionar o token de autenticação

import axios from 'axios'
import { API_URL } from '@/services/utils'

axios.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (user) {
      config.headers.Authorization = user
    }
    return config
  },
  error => {
    Promise.reject(error).then(r => console.log(r))
  }
)
