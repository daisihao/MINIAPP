// components/search/index.js
import {
  KeyWordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
const keywordModel = new KeyWordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:function(){
        console.log("test----")
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArray:[],
    searching:false,
    inputText:String
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
        searching:true
      })
      let word = event.detail.value || event.detail.text
      bookModel.search(0, word).then(res=>{
        this.setData({
          dataArray:res.books,
          inputText: word
        })
        keywordModel.addToHistory(word);
      })
    },
    onDelete(event){
      this.setData({
        searching:false
      })
    }
  },
  //组件初始化的生命周期函数
  attached(){
    let historyWords = keywordModel.getHistory();
    let hotWords = keywordModel.getHot();
    this.setData({
      historyWords: historyWords
    })
    hotWords.then(
      res=>{
        this.setData({
          hotWords:res.hot
        })
      }
    )
  }
})