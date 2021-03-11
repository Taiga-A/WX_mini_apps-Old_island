import {
  HTTP
} from '../util/http.js'
//继承HTTP类
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatesrIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }

  getLikeData(type,index,sCallback){
    this.request({
      // url:'/classic/'+type+'/'+index+'/favor',
      url:`/classic/${type}/${index}/favor`,
      success: (res)=>{
        sCallback(res)
      }
    })
  }

  isLatest(index){
    let latest = this._getLasterIndex()
    return index==latest?true:false
  }
  isFirst(index){
    return index==1?true:false
  }

  //同步写入缓存
  _setLatesrIndex(index) {
    wx.setStorageSync('latest', index)
  }

  //同步读取缓存
  _getLasterIndex() {
    return wx.getStorageSync('latest')
  }

  getClassic(index,nOrP,sCallBack) {
    let key = nOrP=='next'?
      this._getKey(index+1):this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url:'/classic/' + index + '/'+nOrP,
        success: (res)=>{
          wx.setStorageSync(key, res)
          sCallBack(res)
        }
      })
    }else{
      this.getLikeData(classic.type,classic.id,(res)=>{
        classic.fav_nums = res.fav_nums
        classic.like_status = res.like_status
        sCallBack(classic)
      })
    }
  }

  _getKey(index){
    return 'classic-'+index
  }



}

export {
  ClassicModel
}