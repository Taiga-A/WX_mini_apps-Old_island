import {
  HTTP
} from '../../util/http-p'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    } else {
      return words
    }
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword',
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    if (!words.includes(keyword)) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }


  }


}

export {
  KeywordModel
}