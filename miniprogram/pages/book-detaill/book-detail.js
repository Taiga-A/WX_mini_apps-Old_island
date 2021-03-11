// miniprogram/pages/book-detaill/book-detail.js
import {
  BookModel,
} from '../../models/book'
import {
  LikeModel,
} from '../../models/like'
const bookM = new BookModel()
const likeM = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false,
  },
  onLike(event){
    likeM.like(event.detail.behavior,this.data.book.id,400)
  },
  onFakePost(event){
    this.setData({
      posting:true,
    })
  },
  onCancel(){
    this.setData({
      posting:false,
    })
  },
  onPost(event){
    let  comment = event.detail.text
    if(!comment){
      comment = event.detail.value
    }
    if(!comment){
      return
    }
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12字',
        icon:'none',
      })
      return 
    }
    bookM.postComment(this.data.book.id,comment)
      .then(res=>{
        wx.showToast({
          title: '+1',
        })
        this.data.comments.unshift({
          content:comment,
          nums:1
        })
        this.setData({
          comments:this.data.comments,
          posting:false,
        })
        
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const bid = options.bid
    const detail = bookM.getDetail(bid)
    const comments = bookM.getComments(bid)
    const likeStatus = bookM.getLikeStatus(bid)
    // detail.then((res)=>{
    //   this.setData({
    //     book:res,
    //   })
    // })
    // comments.then(res=>{
    //   this.setData({
    //     comments:res.comments,
    //   })
    // })
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeCount:res.fav_nums,
    //     likeStatus:res.like_status,
    //   })
    // })
    // Promise.race （竞争） => 只要有一个执行成功则执行毁回调函数，res指第一个
    Promise.all([detail,comments,likeStatus])
      .then(res=>{
        this.setData({
          book:res[0],
          comments:res[1].comments,
          likeStatus:res[2].like_status,
          likeCount:res[2].fav_nums,
        })
        wx.hideLoading()
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})