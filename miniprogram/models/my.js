import {
  HTTP
} from '../util/http-p'

class MyModel extends HTTP {
  getLikebooksNum(){
    return this.request({
      url:"/book/favor/count",
    })
  }
  getLikeClassic(start=0){
    return this.request({
      url: "/classic/favor",
      data:{
        start:start,
        count:10,
      }
    })
  }





}

export {
  MyModel
}