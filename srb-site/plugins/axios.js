import { Message } from 'element-ui'
import cookie from 'js-cookie'

export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // 获取用户信息
    let userInfo = cookie.get('userInfo')
    if (userInfo) {
      // debugger
      userInfo = JSON.parse(userInfo)
      //将登录用户的token设置到headers中
      console.log(userInfo.token);
      config.headers['token'] = userInfo.token

    }
    console.log('Making request to ' + config.url)
  })

  $axios.onRequestError((error) => {
    console.log('onRequestError', error) // for debug
  })

  $axios.onResponse((response) => {
    console.log('Reciving resposne', response)
    if (response.data.code === 0) {
      return response
    } else if (response.data.code === -211) {
      console.log('用户校验失败')
      // debugger
      cookie.set('userInfo', '')
      window.location.href = '/'
    } else {
      Message({
        message: response.data.message,
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(response)
    }
  })

  //通信失败
  $axios.onResponseError((error) => {
    console.log('onResponseError', error) // for debug
  })
}
