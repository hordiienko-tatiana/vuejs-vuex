/**
 * A wrapper around axios library
 */
import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.authorization = authorizationToken
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
})

export default axios
