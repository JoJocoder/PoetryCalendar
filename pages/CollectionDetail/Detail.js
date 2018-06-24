//index.js
//获取应用实例
var app = getApp()
var poet = require('../../utils/poet.js')
var poetID;
var textAllCollection = {}
Page({


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '诗词小历',
    }
  },
  like: function (e) {
    
    var textAllCollection = wx.getStorageSync('collection')//获取所有文章被收藏的情况
    if (textAllCollection) { //如果初始化时有以collection为建名的缓存
      var textCollection = textAllCollection[poetID]//获取当前文章被收藏的值 TRUE OR FALSE 
      if (textCollection) {
        this.setData({
          collection: !textCollection
        });
      }
      else {
        textAllCollection[poetID] = false;
        wx.setStorageSync('collection', textAllCollection)
        this.setData({
          collection: true
        });
      }
    }
    else { //如果没有缓存数据则新建缓存，并将当前文章的收藏属性值添加进入

      textAllCollection[poetID] = false;
      wx.setStorageSync('collection', textAllCollection)
      this.setData({
        collection: textCollection
      });
    }
    textAllCollection[poetID] = this.data.collection;
    wx.setStorageSync('collection', textAllCollection)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    
      poetID=parseInt(options.poetID)
      
   
    var textAllCollection = wx.getStorageSync('collection')//获取所有文章被收藏的情况
    if (textAllCollection) { //如果初始化时有以collection为建名的缓存
      var textCollection = textAllCollection[poetID]//获取当前文章被收藏的值 TRUE OR FALSE 
      this.setData({
        collection: textCollection
      });
    } else { //如果没有缓存数据则新建缓存，并将当前文章的收藏属性值添加进入
      var textAllCollection = {};
      textAllCollection[poetID] = false;
      wx.setStorageSync('collection', textAllCollection)
    }
    this.setData({
      title: poet.Poetry[poetID].title,
      author: poet.Poetry[poetID].author,
      content: poet.Poetry[poetID].content
    })
  },

}




)
