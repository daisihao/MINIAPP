// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'
import {
  random
} from '../../util/common.js'
let bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // Promise是一个对象,她可以保存状态
    // 第一步 new出Promise对象 第二步 异步代码写入箭头函数
    // pending 正在进行  fulfilled 已经成功   rejected 已经失败
    // new完Promise对象后,该Promise对象即变成pending状态
    // 状态只能改变一次
    // promise.then函数接收两个回调函数，第一个回调函数为promise成功回调函数,第二个回调函数为promise失败回调函数,顺序不可以颠倒
    // const promime = new Promise((resolve,reject)=>{
    //   wx.getSystemInfo({
    //     success: res=>resolve(res),
    //     fail:error=>reject(error)
    //   })
    // });
    // promime.then(res=>console.log(res),error=>console.log(error))
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      })
    })
  },

  onSearching: function(event) {
    this.setData({
      searching: true
    })
  },

  onCancel: function(event) {
    this.setData({
      searching: random()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more:random(16)
    })
    console.log(this.data.more)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})