// pages/sale/sale.js

Page({
  //滑动事件
  touchMove(e){
    var currentX=e.touches[0].pageX;
    var currentY = e.touches[0].pageY;
    var tx=currentX-this.data.lastX;
    console.log(tx)
    var ty = currentY - this.data.lastY;
    console.log(ty)
    var text="";
    //左右方向滑动
    if(Math.abs(tx)>Math.abs(ty)){
      if(tx<0){
        text="向左滑动"
        console.log(text)
      }else if(tx>0){
        text="向右滑动"
        console.log(text)
      }
       //上下方向移动
    } else {
     
      if (ty < 0) {
        text = "向上滑动"
        console.log(text)
      } else if (ty > 0) {
        text = "向下滑动"
        console.log(text)
      }
    }
//将当前坐标进行保存以进行下一次计算
this.data.lastX=currentX;
this.data.lastY=currentY;
this.setData({
  text:text
})

  },
  touchStart:function(e) {
  this.data.lastX=e.touches[0].pageX;
  this.data.lastY=e.touches[0].pageY;
  },
  touchEnd:function(e) {
this.data.currentGesture=0;
this.setData({
  text:"没有滑动"
})
  },

  /**
   * 页面的初始数据
   */
  data: {

list:[
  {id:1,time:'昨日',title:'抢购爆品'},
  { id: 2, time: '8:00', title: '已结束' },
  { id: 3, time: '10:00', title: '已结束' },
  { id: 4, time: '12:00', title: '已结束' },
  { id: 5, time: '14:00', title: '已结束' },
  { id: 6, time: '16:00', title: '已结束' }

  ],
  arr:[],//保存分页返回的数据
    pageSize: 7,//2.保存页大小
    pageIndex: 0,//3.保存分页  页码 
    hasMore: true,//4.是否有下一页数据
    lastX:0,//滑动开始x轴位置
    lastY: 0,//滑动开始y轴位置
    text:"没有滑动",
    currentGesture:0,//标识手势
  },
  loadMore: function () {
    //判断是否有下一页数据
    //如果没有下一页数据，停止函数执行
    if (this.data.hasMore == false) return;
    //4.加载更多   分页数据
    //如果当前页已经是最后一页，不再发送请求
    //console.log("分页")
    wx.showLoading({
      title: '加载数据...',
    })
    //1.获取两个数值 pno ps
    var pno = this.data.pageIndex + 1;
    var ps = this.data.pageSize;
    //2.发送请求/getShopList
    var url = "http://127.0.0.1:3000/sale";
    wx.request({
      url: url,
      data: { pno: pno, pageSize: ps },
      success: (res) => {
        //收到数据 9:005  多显示1s  再隐藏
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
        var rows = this.data.arr.concat(res.data.data);
        //获取总页数
        var pc = res.data.pageCount;
        //判断是否有下一页数据   true  false
        var flag = pno < pc;

        this.setData({
          //3.获取返回当前页内容
         arr: rows,
          pageIndex: pno,
          hasMore: flag//保存判断结果
        })
        //控制面板  APPData
        //练习：下拉操作->只显示第一页
      },
      fails: (res) => {
        console.log("fails:");
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
    this.setData({
      pageIndex: 0,
      arr: [],
      hasMore: true
    })
    this.loadMore();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll(e){
    console.log(e.scrollTop)
  }
  
})