// miniprogram/pages/my/my.js
import {
  MyModel
} from '../../models/my.js'

const myM = new MyModel

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '未授权',
    likeNum:null,
    infoGet: false,
    classics: [],
    nowNum: 0,
    isNone: false,
  },

  getLikeClassic(){
    if(!this.data.isNone){
      myM.getLikeClassic(this.data.nowNum)
        .then(res=>{
          this.setData({
            classics: this.data.classics.concat(res),
            nowNum: this.data.nowNum + res.length,
          })
          if(res.length%10 != 0 || res.length == 0){
            this.setData({
              isNone: true,
            })
          }
        })
    }
  },

  getUserInfo(event){
    wx.getUserInfo({
      success: res=>{
        this.setData({
          userName: res.userInfo.nickName,
          infoGet: true,
        })
        myM.getLikebooksNum()
          .then(res=>{
            this.setData({
              likeNum: res.count,
            })
          })
        this.getLikeClassic()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getLikeClassic()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})