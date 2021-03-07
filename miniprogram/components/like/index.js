// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type:Number,
    },
    like:{
      type:Boolean,
    },
  },

  /**
   * 组件的初始数据(私有)
   */
  data: {
    islike:'./img/红心.png',
    dislike:'./img/空心.png',
    likeColor:'color:rgb(255, 86, 86)',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike:function(event){
      let like = this.properties.like;
      let num = this.properties.num;
      like?num--:num++;
      this.setData({
        like: !like,
        num: num,
      });
      let behavior = like?'cancel':'like'
      this.triggerEvent('Like',{
        behavior:behavior,
      },{})


    },


  },
})
