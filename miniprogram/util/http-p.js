/**
 * http请求的封装
 */

import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了一个错误..',
  1005:'AppKey无效',
  3000:'期刊不存在',
  1007:'服务器地址错误'
}


class HTTP{
  request({url,data={},method='GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }

  _request(url,resolve,reject,data={},method='GET'){
    // url,data,method,success()
    wx.request({
      url:config.api_base_url + url,
      data:data,
      method:method,
      header:{
        'appkey':config.appkey,
        'content-type':'application/json'
      },
      success:(res)=>{
        const code = res.statusCode.toString()
        if (code.startsWith('2')){
          resolve(res.data)
        }else{//服务器异常
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{//API调用失败
        reject()
        const error_code = res.data.error_code
        this._show_error(error_code)
      }
    })
  }
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'nonw'
    })
  }
}

export {HTTP}