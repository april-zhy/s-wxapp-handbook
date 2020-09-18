// pages/handbook/home.js
Page({
  data: {
    currentPageIndex: 0,
    culturalIndicatorDots: true,
    pages: [{
        id: 'home', // 首页
        src: 'cover.jpg'
      },
      {
        id: 'salute', // 致敬
        src: 'salute.jpg'
      },
      {
        id: 'catalog', //目录
        src: 'catalog.jpg'
      },
      {
        id: 'speech', // 致辞
        src: 'speech.jpg'
      },
      {
        id: 'mission', // 使命、愿景
        src: 'mission.jpg'
      },
      {
        id: 'struggle', // 奋斗文化 轮播
        src: 'struggle/struggle_bg.png'
      },
      {
        id: 'sincerity', // 诚信文化 轮播
        src: 'sincerity/sincerity_bg.png'
      },
      {
        id: 'coordination', // 协同文化
        src: 'coordination/coordination_bg.png'
      },
      {
        id: 'innovate', // 创新文化
        src: 'innovate/innovate_bg.png'
      },
      {
        id: 'performance', //绩效文化
        src: 'performance/performance_bg.png'
      }
    ],
    catalogList: [{
        id: 'speech' //致辞,
      },
      {
        id: 'mission' // 使命愿景
      },
      {
        id: 'cultural' // 文化概念解读
      },
      {
        id: 'struggle' // 奋斗文化
      },
      {
        id: 'sincerity' //诚信文化
      },
      {
        id: 'coordination' // 协同文化
      },
      {
        id: 'innovate' // 创新文化
      },
      {
        id: 'performance' //绩效文化
      },
      {
        id: 'message' // 寄语
      }
    ],
    catalogStyle: {},
    catalogItemStyle: {},
    footerStyle: {},
    culturalSwiperStyle: {},
    culturalSwiper: new Array(4),
    imageWidth: 1080,
    imageHeight: 1920,
    catalogPaddingTop: 245,
    catalogPaddingLeft: 115,
    catalogItemWidth: 850,
    catalogItemHeight: 100,
    catalogItemMargin: 58,
    culturalSwiperWidth: 1000,
    culturalSwiperHeight: 1060,
    culturalSwiperPaddingTop: 180,
    navigatorHeight: 140,
    demoCulturalSwiper: [{
        name: 'A',
        style: 'rgba(39,130,215,0.25)'
      },
      {
        name: 'B',
        style: 'rgba(196,124,254,0.25)'
      },
      {
        name: 'C',
        style: 'rgba(26,173,25,0.25)'
      }
    ]
  },

  onLoad: function () {
    const imgWidth = this.data.imageWidth;
    const imgHeight = this.data.imageHeight;
    const catalogPaddingTop = this.data.catalogPaddingTop;
    const catalogPaddingLeft = this.data.catalogPaddingLeft;
    const catalogItemWidth = this.data.imageWidth - this.data.catalogPaddingLeft * 2;
    const catalogItemHeight = this.data.catalogItemHeight;
    const catalogItemMargin = this.data.catalogItemMargin;
    const culturalSwiperWidth = this.data.culturalSwiperWidth;
    const culturalSwiperHeight = this.data.culturalSwiperHeight;
    const culturalSwiperPaddingTop = this.data.culturalSwiperPaddingTop;
    const culturalSwiperPaddingLeft = (this.data.imageWidth - this.data.culturalSwiperWidth) / 2;
    const navigatorHeight = this.data.navigatorHeight;

    // 图片实际尺寸
    const imgActualSize = {
      w: imgWidth,
      h: imgHeight,
      ratio: imgWidth / imgHeight,
    };
    // 手机的尺寸
    const systemSize = {
      w: 1,
      h: 1,
      ratio: 1
    };
    wx.getSystemInfo({
      success(res) {
        systemSize.w = res.windowWidth;
        systemSize.h = res.windowHeight;
        systemSize.ratio = res.windowWidth / res.windowHeight;
      }
    });
    // 图片显示尺寸
    const viewSize = this._getViewSize(imgActualSize, systemSize);
    const _culturalSwiperStyle = {
      size: {
        width: culturalSwiperWidth * viewSize.widthRadio,
        height: culturalSwiperHeight * viewSize.heightRadio
      },
      position: {
        top: culturalSwiperPaddingTop * viewSize.heightRadio + viewSize.paddingTop,
        left: culturalSwiperPaddingLeft * viewSize.widthRadio + viewSize.paddingLeft
      }
    };
    const _catalogStyle = {
      padding: {
        left: catalogPaddingLeft * viewSize.widthRadio + viewSize.paddingLeft,
        top: catalogPaddingTop * viewSize.heightRadio + viewSize.paddingTop
      }
    };
    const _catalogItemStyle = {
      size: {
        width: catalogItemWidth * viewSize.widthRadio,
        height: catalogItemHeight * viewSize.heightRadio
      },
      margin: {
        bottom: catalogItemMargin * viewSize.heightRadio
      }
    };
    const _footerStyle = {
      size: {
        width: viewSize.width,
        height: navigatorHeight * viewSize.heightRadio
      },
      position: {
        top: systemSize.h - viewSize.paddingTop - navigatorHeight * viewSize.heightRadio,
        left: viewSize.paddingLeft
      }
    };
    this.setData({
      culturalSwiperStyle: this.formatStyle(_culturalSwiperStyle),
      catalogStyle: this.formatStyle(_catalogStyle),
      catalogItemStyle: this.formatStyle(_catalogItemStyle),
      footerStyle: this.formatStyle(_footerStyle)
    });
  },

  formatStyle: function (style) {
    let _styleStr = '';
    if (style.size) {
      _styleStr = _styleStr + 'width:' + style.size.width + 'px;height:' + style.size.height + 'px;';
    }
    if (style.position) {
      _styleStr = _styleStr + 'top:' + style.position.top + 'px;left: ' + style.position.left + 'px;';
    }
    if (style.padding) {
      _styleStr = _styleStr + 'padding:' + style.padding.top + 'px ' + style.padding.left + 'px;';
    }
    if (style.margin) {
      _styleStr = _styleStr + 'margin-bottom:' + style.margin.bottom + 'px;';
    }
    return _styleStr;
  },

  navigateToPage: function (e) {
    const id = e.target.dataset.id;
    if (!id) {
      return;
    }
    const index = this.data.pages.findIndex(item => item.id === id);
    if (index === -1) {
      wx.showToast({
        title: '暂无' + id + '页面',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.setData({
      currentPageIndex: index
    });
  },

  _getViewSize: function (imgSize, systemSize) {
    const obj = {
      width: 1,
      height: 1,
      paddingLeft: 0,
      paddingTop: 0,
      widthRadio: 1,
      heightRadio: 1
    };
    if (imgSize.ratio <= systemSize.ratio) {
      obj.height = systemSize.h;
      obj.width = obj.height * imgSize.ratio;
    } else {
      obj.width = systemSize.w;
      obj.height = obj.width / imgSize.ratio;
    }
    obj.widthRadio = obj.width / imgSize.w;
    obj.heightRadio = obj.height / imgSize.h;
    obj.paddingTop = (systemSize.h - obj.height) / 2;
    obj.paddingLeft = (systemSize.w - obj.width) / 2;
    return obj;
  }
});