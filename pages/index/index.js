// pages/home/home.js
Page({

  //跳转
handleTap:function(e){
  //console.log(1111)
  //1.获取自定义属性
  var id = e.target.dataset.id;
 // console.log(id)
  //console.log(2222)
  var page = "/pages/index/index";
  //console.log(page)
  //console.log(33)
  //2.判断是否符合条件
  if (id == 1) {
    page = "/pages/sale/sale";
  }
  if (id == 2) {
    page = "/pages/shoplist/shoplist";
  }
  wx.navigateTo({
    url: page,
  })
},

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    navlist:[],
    block_img:[
      { id: 1, img_url:"http://127.0.0.1:3000/2019-01-05_101457.png",new_price:89,ori_price:198},
      { id: 2, img_url: "http://127.0.0.1:3000/2019-01-05_101457.png", new_price: 89, ori_price: 198 },
      { id: 3, img_url: "http://127.0.0.1:3000/2019-01-05_101457.png", new_price: 89, ori_price: 198 },
      { id: 4, img_url: "http://127.0.0.1:3000/2019-01-05_101457.png", new_price: 89, ori_price: 198 },
      { id: 6, img_url: "http://127.0.0.1:3000/2019-01-05_101457.png", new_price: 89, ori_price: 198 },
      { id: 7, img_url: "http://127.0.0.1:3000/2019-01-05_101457.png", new_price: 89, ori_price: 198 },
      { id: 8, img_url: "http://127.0.0.1:3000/2019-01-05_101457.png", new_price: 89, ori_price: 198 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImages();
    this.getNavImages();
  },
  //获取banner图片信息
  
getImages:function(){
  var url="http://127.0.0.1:3000/getImages";
  wx.request({
    url:url,
    methods:"GET",
    success:(res)=>{
      this.setData({
        list:res.data
      })
    },
    fails:(res)=>{
      console.log("fails:");
      console.log(res)
    }
  })
},
//获取九宫格信息
  getNavImages:function(){
    var url2 ="http://127.0.0.1:3000/getNavImages";
    wx.request({
      url:url2,
      methods:"GET",
      success:(res)=>{
        this.setData({
          navlist:res.data
        })
      },
      fails:(res)=>{
        console.log("fails:");
        console.log(res);
      }
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
    console.log("--下拉--")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("--上拉--")
  },
  /**
   * 滑动
   */
  onPageScroll: function (opt) {
    console.log("--滑动--");
    console.log(opt.scrollTop);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})