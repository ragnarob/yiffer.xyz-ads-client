import axios from 'axios'
import config from '@/config.json'
let baseUrl = config.apiBaseUrl

export default {
  async logRoute (route, description) {
    axios.post(baseUrl + '/log-route', {route, description})
  },

  async logEvent (event, description) {
    axios.post(baseUrl + '/log-event', {event, description: description || null})
  },
}