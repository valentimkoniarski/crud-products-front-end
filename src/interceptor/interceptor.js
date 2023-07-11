import axios from 'axios'

axios.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = user
    }
    return config
  },
  error => {
    Promise.reject(error).then(r => console.log(r))
  }
)
