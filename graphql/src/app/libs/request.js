import axios from 'axios'

const get = (url, params = {}, headers = {}, config = {}) => axios.get(url, { params, headers, ...config })

const post = (url, data = {}, headers = {}, config = {}) => axios.post(url, data, { headers, ...config })

const put = (url, data = {}, headers = {}, config = {}) => axios.put(url, data, { headers, ...config })

const patch = (url, data = {}, headers = {}, config = {}) => axios.patch(url, data, { headers, ...config })

const remove = (url, data = {}, headers = {}, config = {}) => axios.remove(url, data, { headers, ...config })

export default {
  get,
  post,
  put,
  patch,
  remove,
}
