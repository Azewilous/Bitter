import axios from 'axios'
import AuthService from './auth.service'

export const initializeInterceptor = () => {
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    if (err.response.status === 401) {
      if (err.response.data.message === 'Unauthorized token provided.') {
        AuthService.logout()
      }
    } 
    return Promise.reject(err)
  })
}

export default {
  initializeInterceptor
}
