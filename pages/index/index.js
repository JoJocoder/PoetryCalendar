//index.js
//获取应用实例
var app = getApp()
var calendar = require('../../utils/calendar.js')
var poet = require('../../utils/poet.js')
//var poet= require('../../utils/random.js')
var calendarConverter = new calendar.CalendarConverter();
var yjID = Math.floor(Math.random() * 15);
var today = new Date();
var poetID=parseInt(55+(today- new Date('2018/6/24')) / 1000 / 60 / 60 / 24);

var textAllCollection = {}
var lunar = calendarConverter.solar2lunar(today);
var lunartime=lunar.cYear + "年" + lunar.lunarMonth
  + "月" + lunar.lunarDay;
var weeks = ["日", "一", "二", "三", "四", "五", "六"];
var yi=['平安','光芒','面对','沉着','团聚','温情','包容','热爱','善良','坚持','积极','勤奋','希望','新生','天真']
var ji=['意外','暗淡','逃避','浮躁','分散','无情','自私','无望','冷漠','放弃','消极','倦怠','失望','过往','沧桑']
var today = new Date();
var solartime= today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate()+'日 ' + " 星期" + weeks[today.getDay()];
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
  data: {
    today:solartime,
    lunar:lunartime,
    title: poet.Poetry[poetID].title,
    author: poet.Poetry[poetID].author,
    content: poet.Poetry[poetID].content,
    likeornot: "../images/notlike.png",
    yi:yi[yjID],
    ji:ji[yjID]
  },
  next: function (e) {
    poetID = Math.floor(Math.random() *55);
    this.setData({
      title: poet.Poetry[poetID].title,
      author:poet.Poetry[poetID].author,
      content: poet.Poetry[poetID].content  
    })
    var textAllCollection = wx.getStorageSync('collection')//获取所有文章被收藏的情况
    if (textAllCollection) { //如果初始化时有以collection为建名的缓存
      var textCollection = textAllCollection[poetID]//获取当前文章被收藏的值 TRUE OR FALSE 
      if (textCollection) {
      this.setData({
        collection: textCollection
      });
      }
      else{
        textAllCollection[poetID] = false;
        wx.setStorageSync('collection', textAllCollection)
        this.setData({
          collection: false
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
   moveto: function(e){
wx.navigateTo({
  url: '../Collections/Collections',
})
   },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function (options) {
   
   
  var textAllCollection = wx.getStorageSync('collection')//获取所有文章被收藏的情况
        if (textAllCollection) { //如果初始化时有以collection为建名的缓存
    var textCollection = textAllCollection[poetID]//获取当前文章被收藏的值 TRUE OR FALSE 
    this.setData({
      collection: textCollection
    });
  } else { //如果没有缓存数据则新建缓存，并将当前文章的收藏属性值添加进入
          var textAllCollection={};
            textAllCollection[poetID] = false;
    wx.setStorageSync('collection', textAllCollection)
  }

},
  onShow(){
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
  }},




)
