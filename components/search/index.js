// components/search/index.js
import {
  KeyWordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'
const keywordModel = new KeyWordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    inputText: '',
    loading: false,
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.initiallise()
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      let word = event.detail.value || event.detail.text
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          inputText: word
        })
        keywordModel.addToHistory(word);
        this._hideLoadingCenter()
      })
    },
    onDelete(event) {
      this._closeResult()
      this.initiallise()
      this.setData({
        inputText: ''
      })
    },
    loadMore(event) {
      if (!this.data.inputText) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.inputText).then(res => {
          this.setMoreData(res.books)
          this.unLocked();
        }, () => {
          this.unLocked();
        })
      }
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _closeResult() {
      this.setData({
        searching: false
      })
    }


  },
  //组件初始化的生命周期函数
  attached() {
    let historyWords = keywordModel.getHistory();
    let hotWords = keywordModel.getHot();
    this.setData({
      historyWords: historyWords
    })
    hotWords.then(
      res => {
        this.setData({
          hotWords: res.hot
        })
      }
    )
  }
})