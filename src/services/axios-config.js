import axios from 'axios'

axios.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = user
    }


    config.validateStatus = function (status) {
      if (status === 403) {
        localStorage.removeItem('user')
        window.location.href = '/login'
      }

      return status >= 200 && status < 300; // default
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
