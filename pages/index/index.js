//index.js
const app = getApp()

Page({
  data: {},

  onLoad: function () {
    wx.showLoading({
      title: 'loading',
    });

    setTimeout(() => {
      wx.redirectTo({
        url: '../handbook/home',
        success: () => {
          wx.hideLoading();
        }
      });
    }, 1 * 1000);
  },

})