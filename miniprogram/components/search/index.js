// components/search/index.js
import {
  BookModel
} from '../../models/book'
import {
  KeywordModel
} from '../models/keyword'

const bookM = new BookModel()
const keywordM = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:Boolean,
      observer(){
        if(!this.data.none && this.properties.more){
          console.log('more!!')
          if(this.data.dataArray.length != 0){
            this.onConfirm({detail:{text:this.data.inputValue}})
          }
        }
      }
    },
  },
  observers: {
    'inputValue': function(inputValue){
      if(inputValue != ''){
        this.setData({
          dataArray: [],
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    inputValue: '',
    none:false,
    // total:99999,
  },

  attached() {
    this.setData({
      historyWords: keywordM.getHistory(),
    })
    keywordM.getHot().then(res => {
      this.setData({
        hotWords: res.hot,
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      this.setData({
        searching: true,
      })
      let q = event.detail.text
      if(!q){
        q = event.detail.value
      }
      if(q == ''){
        return
      }
      if(q != this.data.inputValue){
        this.setData({
          inputValue:q,
        })
      }
      keywordM.addToHistory(q)
      bookM.search(this.data.dataArray.length, q)
        .then(res => {
          this.setData({
            dataArray: this.data.dataArray.concat(res.books),
            total:res.total,
            more:false,
          })
          if(this.data.dataArray.length == res.total){
            this.setData({
              none: true,
            })
          }
          // console.log(this.data.total)
          console.log(res)
          console.log(this.data.dataArray)
        },()=>{
          this.setData({
            more:false,
          })
        })
    },
    onDelete(event){
      this.setData({
        searching:false,
        inputValue:'',
      })
    }
  }
})