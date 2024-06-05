import axios from 'axios'

const get = (url, params = {}, headers = {}, config = {}) => axios.get(url, { params, headers, ...config })

const post = (url, params = {}, headers = {}, config = {}) => axios.post(url, { params, headers, ...config })

const put = (url, params = {}, headers = {}, config = {}) => axios.put(url, { params, headers, ...config })

const patch = (url, params = {}, headers = {}, config = {}) => axios.patch(url, { params, headers, ...config })

const remove = (url, params = {}, headers = {}, config = {}) => axios.remove(url, { params, headers, ...config })

export default {
  get,
  post,
  put,
  patch,
  remove,
}
