// miniprogram/pages/home/home.js
import {ClassicModel} from '../../models/classic'
import {LikeModel} from '../../models/like'

let classicM = new ClassicModel()
let likeM = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest:true,
    first:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicM.getLatest((res)=>{
      this.setData({
        classicData:res,
      })
    })
  },
  //点赞
  onLike: function(event){
    let behavior = event.detail.behavior
    likeM.like(behavior,this.data.classicData.id,this.data.classicData.type)
  },
  //改变期数
  onClassicChange(event){
    let index = this.data.classicData.index
    classicM.getClassic(index,event.detail.nOrP,(res)=>{
      this.setData({
        classicData:res,
        latest:classicM.isLatest(res.index),
        first:classicM.isFirst(res.index),
      })
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