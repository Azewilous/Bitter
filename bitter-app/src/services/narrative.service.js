import axios from "axios"
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL

axios.defaults.headers.common[process.env.REACT_APP_API_KEY_ID] = process.env.REACT_APP_API_KEY

class NarrationService {
  createNarration(id, narrative) {
    let narrartive = {user: id, message: narrative}
    return axios.post(`${API_URL}narrative/create`, narrartive, { headers: authHeader() })
  }
  getAllNarratives() {
    return axios.get(`${API_URL}narrative/all`, { headers: authHeader() })
  }
}

export default new NarrationService()