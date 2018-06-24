
var poet = require('../../utils/poet.js')
// pages/Collections/Collections.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var textAllCollection = wx.getStorageSync('collection')

    var arr=new Array();
    for (var text in textAllCollection)
    {
if(textAllCollection[text])
{
  arr.push({ name: poet.Poetry[text].title,id:text});
}
    }
  this.setData(
      {array:arr,
      className_height:60, }
  )
  },
  moveto: function (e) {
    wx.navigateTo({
      url: '../CollectionDetail/Detail?poetID=' + e.currentTarget.id,
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
    
    var textAllCollection = wx.getStorageSync('collection')

    var arr= new Array();
  for(var text in textAllCollection)
{
  if (textAllCollection[text]) {
    arr.push({ name: poet.Poetry[text].title, id: text });
  }
}
this.setData(
  {
    array: arr,
    className_height: 60,
  }
)
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