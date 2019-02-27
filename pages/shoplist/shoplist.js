// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[],//1.保存分页返回的数据
pageSize:7,//2.保存页大小
pageIndex:0,//3.保存分页页码
hasMore:true//4.是否有下一页数据
  },
loadMore:function(){
  //判断是否有下一页数据  如果没有下一页数据，停止函数执行
  if(this.data.hasMore==false) return;
  //4.加载更多  分页数据
  //如果当前页已经是最后一页，不再发送请求
  wx.showLoading({
    title: '加载数据...'
  })
  //1.获取两个数值 pno ps
  var pno=this.data.pageIndex+1;
 // console.log(pno)
  var ps=this.data.pageSize;
  //2.发送请求/shoplist
  var url = "http://127.0.0.1:3000/shoplist";
  wx.request({
    url: url,
    data:{pno:pno,pageSize:ps},
    success: (res) => {
     // console.log(res)
      //收到数据  多显示1s  再隐藏
      setTimeout(function(){
        wx.hideLoading();
      },1000);
      var rows=this.data.list.concat(res.data.data);
      //获取总页数
      var pc=res.data.pageCount;
      //判断是否有下一页数据 true false
      var flag=pno<pc;
      this.setData({
        //获取返回当前页的内容
        list:rows,
        pageIndex:pno,
        hasMore:flag//保存判断结果
      })
    },
    fails: (res) => {
      console.log("fails:");
      console.log(res)
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
  pageIndex:0,
  list:[],
  hasMore:true
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

  }
})