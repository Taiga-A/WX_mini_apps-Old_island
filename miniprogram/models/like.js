//提交like属性到服务器
import {
  HTTP
} from '../util/http'

class LikeModel extends HTTP {
  like(behavior, ID, classType) {
    let url = behavior == 'like' ? '/like' : '/like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: ID,
        type: classType,
      }
    })
  }
}
export {
  LikeModel
}