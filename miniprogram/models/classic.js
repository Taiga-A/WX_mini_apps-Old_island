
import {HTTP} from '../util/http.js'
//继承HTTP类
class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url:'/classic/latest',
      success:(res)=>{
        sCallback(res)
      }
    })
  }
}

export {ClassicModel}
