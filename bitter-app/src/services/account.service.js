import axios from "axios"
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL

axios.defaults.headers.common[process.env.REACT_APP_API_KEY_ID] = process.env.REACT_APP_API_KEY

class AccountService {
  getHome() {
    return axios.get(`${API_URL}account/home`, { headers: authHeader() })
  }
}

export default new AccountService()