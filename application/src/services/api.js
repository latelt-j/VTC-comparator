import qs from 'qs'
import axios from 'axios'
import base64 from 'base-64'
import idx from 'idx'

import { CONTENT_TYPE, FULL_URL, WORDPRESS_URL } from 'src/environement'

class Api {
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL
    this.api = axios.create({ baseURL, headers, timeout: 35 * 1000 })
    this.headers = headers
  }

  setAccessToken = (token) => {
    this.headers = {
      ...this.headers,
      'Authorization': `Basic ${base64.encode(`${token}:`)}`,
    }
  }

  // all = async () => {
  //   if (arguments.length === 0) return
  //
  //   return axios.all(arguments) // eslint-disable-line
  // }

  jsonToFormData = (json) => {
    const formData = new FormData()

    Object.keys(json).forEach((key) => {
      formData.append(key, json[key])
    })

    return formData
  }

  jsonToQuery = json => json ? `?${qs.stringify(json)}` : ''

  get = async (path = '', data, options = {}) => {
    const strQuery = this.jsonToQuery(data)
    const res = await this.api.get(
      `${path}${strQuery}`,
      { ...options, headers: { ...this.headers, ...options.headers } },
    ).catch((error) => { this.handleRequestError(error, path, data, options) })

    if (this.baseURL === WORDPRESS_URL) {
      return res;
    }
    return res.data.result
  }

  post = async (path = '', body = { data: null }, options = {}) => {
    const formData = this.jsonToFormData(body)
    const res = await this.api.post(
      path,
      formData,
      { ...options, headers: { ...this.headers, ...options.headers } },
    ).catch((error) => { this.handleRequestError(error, path, body, options) })

    return res.data.result
  }

  put = async (path = '', body, options = {}) => {
    const formData = this.jsonToFormData(body)

    const res = await this.api.put(
      path,
      formData,
      { ...options, headers: { ...this.headers, ...options.headers } },
    ).catch((error) => { this.handleRequestError(error, path, body, options) })

    return res.data.result
  }

  delete = async (path = '', body, options = {}) => {
    const formData = this.jsonToFormData(body)

    const res = await this.api.delete(
      path,
      { ...options, data: formData, headers: { ...this.headers, ...options.headers } },
    ).catch((error) => { this.handleRequestError(error, path, body, options) })

    return res.data.result
  }

  handleRequestError = (error, path, body, options) => {
    const err = new Error()

    if (!error.response && !error.code) {
      console.log({ error })
      err.name = 'NETWORK_ERROR'
      err.status = 'SERVER_ERROR'
      err.message = 'Network error'
    } else if (!error.response && error.code === 'ECONNABORTED') {
      err.name = 'TIMEOUT_ERROR'
      err.status = 'SERVER_ERROR'
      err.message = 'Timeout from server'
    } else {
      err.name = 'SERVER_ERROR'
      err.status = 'SERVER_ERROR'
      err.message = idx(error, _ => _.response.data.message) || `Server error, status: ${idx(error, _ => _.response.status)}`
      err.statusCode = idx(error, _ => _.response.status)
      err.data = idx(error, _ => _.response.data)
      err.headers = idx(error, _ => _.response.headers)
      err.type = idx(error, _ => _.response.data.error_type)
      err.req = {
        path: `${this.baseURL}${path}`,
        body,
        options,
      }
    }
    throw err
  }
}

export default {
  parkmatch: new Api(FULL_URL, { 'Content-Type': CONTENT_TYPE }),
  wordPress: new Api(WORDPRESS_URL, { 'Content-Type': CONTENT_TYPE }),
  parkmatchAnonymous: new Api(FULL_URL, { 'Content-Type': CONTENT_TYPE }), // Without Authorization header
}
