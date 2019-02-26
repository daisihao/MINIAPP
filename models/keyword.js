import {
  HTTP
} from '../util/http-p.js'

class KeyWordModel extends HTTP {
  key = 'q';
  maxLength = 10;
  //获取历史搜索关键字
  getHistory() {
    let words = wx.getStorageSync(this.key);
    if (!words) {
      return []
    }
    return words;
  }
  //获取热门搜索关键字
  getHot() {
    return this.request({
      url:'/book/hot_keyword'
    })
  }
  //关键字写入缓存
  addToHistory(keyword) {
    let words = this.getHistory();
    let has = words.includes(keyword);
    if (!has) {
      let length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword);
      wx.setStorageSync(this.key, words)
    }
  }
}

export {
  KeyWordModel
}