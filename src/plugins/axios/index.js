import axios from 'axios'
import { Message } from 'cut-ui'
import { RES_CODE } from './portCode'
axios.defaults.timeout = 150000

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    const ContentTypeArr = ['multipart/form-data']
    if (!ContentTypeArr.includes(config.headers['Content-Type'])) {
      // 不是form-data类型才添加公共参数
      if (config.method === 'post') {
        // post请求
        config.data = Object.assign({}, config.data)
      } else {
        // get请求
        config.params = Object.assign({}, config.params)
      }
    }
    return config
  },
  (err) => {
    Message.error('请求超时~')
    return Promise.resolve(err)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.status && res.status === 200 && res.data.status === 'error') {
      return
    }
    return res
  },
  (err) => {
    if (err.response.status === 504 || err.response.status === 404) {
      Message.error('服务器正在外太空遨游，请稍后再试~')
    } else if (err.response.status === 403) {
      Message.error('权限不足，请联系管理员~')
    } else {
      Message.error('请求失败，请稍后重试~')
    }
    return Promise.resolve(err.response)
  },
)

// 拦截code码
export const interceptResCode = (r, resolve) => {
  const res = r.data
  if (res.code === '201900') {
    // 系统关闭或维护中
  } else {
    // 正常抛出
    const resCode = Object.values(RES_CODE)
    if (resCode.find((item) => item.includes(res.code) === true)) {
      Object.entries(RES_CODE).forEach((item) => {
        if (item[1].includes(res.code)) {
          res.code = item[0]
        }
      })
    }
    resolve(res)
  }
}

// post请求
export const postRequest = (url, params) => {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      headers: {
        tokenId: localStorage.getItem('tokenId'),
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then((res) => {
      interceptResCode(res, resolve)
    })
  })
}

// get请求
export const getRequest = (url, params) => {
  return new Promise((resolve) => {
    axios({
      method: 'get',
      url: url,
      params: params,
      headers: {
        tokenId: localStorage.getItem('tokenId'),
      },
    }).then((res) => {
      interceptResCode(res, resolve)
    })
  })
}

// 文件上传
export const uploadFileRequest = (url, params) => {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      interceptResCode(res, resolve)
    })
  })
}
