/**
 * http请求的封装
 */

import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了一个错误..',
  1005:'AppKey无效',
  3000:'期刊不存在'

}


class HTTP{
  request(params){
    // url,data,method,success()
    wx.request({
      url:config.api_base_url + params.url,
      data:params.data,
      method:params.method,
      header:{
        'appkey':config.appkey,
        'content-type':'application/json'
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if (code.startsWith('2')){
          params.success && params.success(res.data)
        }else{//服务器异常
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{//API调用失败
        let error_code = res.data.error_code
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
    })
  }
}

export {HTTP}