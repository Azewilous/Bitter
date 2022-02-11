import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

axios.defaults.headers.common[process.env.REACT_APP_API_KEY_ID] = process.env.REACT_APP_API_KEY

class AuthService {

  loign(email, password) {
    return axios.post(`${API_URL}account/login`, {
      email, password
    })
  }

  logout() {
    localStorage.removeItem('account')
  }

  register(fullname, email, password) {
    return axios.post(`${API_URL}account`, {
      fullname, email, password
    })
  }

  getAccount() {
    return JSON.parse(localStorage.getItem('account'))
  }

}

export default new AuthService()