import axios from 'axios'

import uri from './config'



var url = {
  payTypes:uri.root + "/payType/index",
  logout:uri.root + "/logout", //退出..
  mallHome:uri.root + "/goods/query",
  mallHomeNew:uri.root + "/goods/query",
  goodsQuery: uri.root + "/goods/query",
  goodsDetail:uri.root + "/goods/",
  isLogin:uri.root + "/login",
  myOrder:uri.root + "/order/queryOrderByUser",
  checkBuyGoods:uri.root + "/goods/checkBuyGoods",  //购买校验.
  cancelOrder:uri.root+"/order/cancelOrder",  //订单取消,申请退款同一.
  confirmRev:uri.root+"/order/confirmRev",  //去人收货。
  rechargeType:uri.root+"/dict/rechargeAccTypeList", //充值类型...
  createOrder:uri.root + "/order/createOrder", //实物商品.
  orderView:uri.root + "/order/view",
  wepay:uri.root + "/pay/swift-pass/we-chat", // 微信支付,
  aliPay:uri.root + "/pay/swift-pass/ali-pay", //支付宝支付
  lyqPay:uri.root + "/pay/lyq-pay",  //乐盈币支付.
  payStatus:uri.root + "/pay/swift-pass/query",
  addressList:uri.root + "/user/address/index", //地址列表.
  addAddr:uri.root + "/user/address/save",      //保存更新地址
  viewAddress:uri.root + "/user/address/view",     //根据id查看地址
  //商家: 1,商家信息..
  shopInfo:uri.root + "/merchant/shop/viewBasic",  //商家信息.
  //商家: 2.商家店铺全部信息
  shopGoods:uri.root + "/goods/query" , // 商家所有的信息.
}
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
/**
 * @desp 所有的接口都需要参数terminal:4 .country:1<中国,待定.>
 *     放在url的query参数里.
 */
var qs = require('qs');


/**
 * @desp 注意,后期需要优化此结构....
 */
export default {


  getCommonConfig(key){
    return uri.config[key];
  },
  getRegList(){
    return uri.regList;
  },

  logout(){
    return axios({
      url: url.logout,
      method: 'post',
      withCredentials: true,
      params: {}
    })
  },

  getPayTypes(params){
    return axios({
      url: url.payTypes,
      method: 'get',
      withCredentials: true,
      params: params
    })
  },
  /**
   * 商家...信息
   * @param params
   * @returns {AxiosPromise}
   */
  getShopInfo: function(params){

    return axios({
      url: url.shopInfo,
      method: 'get',
      withCredentials: true,
      params: params
    })
  },
  getShopGoods: function(params){
    return axios({
      url: url.shopGoods,
      method: 'get',
      withCredentials: true,
      params: params
    })
  },

  //商品购买校验
  checkBuyGoods(params){
    return axios({
      url: url.checkBuyGoods,
      method: 'post',
      withCredentials: true,
      data: params
    })
  },

  //查看订单详情
  getOrderView(params){
    return axios({
      url: url.orderView,
      method: 'get',
      withCredentials: true,
      params: params
    })
  },
  //获取充值的类型(虚拟)
  getRechargeType(params){
    return axios({
      url: url.rechargeType,
      method: 'get',
      withCredentials: true,
      params: params
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
    })
  },
  getPayStatus(params){
    return axios({
      url: url.payStatus,
      method: 'get',
      withCredentials: true,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  //微信支付
  wePay(params) {
    // return axios.get(url.wepay,{params: params})
    return axios({
      url: url.wepay,
      method: 'post',
      withCredentials: true,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  aliPay(params) {
    // return axios.get(url.aliPay,{params:params})
    return axios({
      url: url.aliPay,
      method: 'post',
      withCredentials: true,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  lyqPay(params){
    return axios({
      url: url.lyqPay,
      method: 'post',
      withCredentials: true,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  //商城首页.
  mallHome() {
    var params = {
      terminal:4,
      size:6,
      // sort:'updateDate,desc',
      category:0,
      page:0
    }
    return axios({
      url: url.mallHome+"?sort=salesAmount,desc&sort=updateDate,desc",
      method: 'get',
      withCredentials: true,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  //最新推荐.
  mallHomeNew(page) {
    var params =
      {
        terminal:4,
        size:20,
        sort:'createTime,desc',
        category:0,
        page:page
      }

    return axios({
      url: url.mallHomeNew,
      method: 'get',
      withCredentials: true,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // return axios.get(url.mallHomeNew,{params: {terminal:4,size:20,sort:'createTime,desc',category:0,name:"",page:page}})
  },

  /**
   * 商品查询.....
   * @param params
   * @returns {AxiosPromise}
   */
  goodsQuery(params,queryType) {
    var query_url = url.goodsQuery;
    var reqParam = {};
    if (queryType == 1) {
      reqParam  = {
        category:params.category,
        name : params.name,
        page : params.page,
        size : params.size,
      }
      query_url = url.goodsQuery + "?sort="+params.sort+"&sort=updateDate,desc";
    } else {
      reqParam = params;
    }
    return axios({
      url: query_url,
      method: 'get',
      withCredentials: true,
      params: reqParam,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  //商品详情
  goodsDetail(goodId) {
    return axios({
      url: url.goodsDetail+goodId,
      method: 'get',
      withCredentials: true,
      params: {},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  //是否登录
  isLogin(){
    return axios({
      url: url.isLogin,
      method: 'post',
      withCredentials: true,
      params: {},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  queryMyOrders(params){
    return axios({
      url:url.myOrder,
      method:'get',
      withCredentials:true,
      params:params,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
  },
  //取消订单
  cancelOrder(orderId) {
    return axios({
      url:url.cancelOrder,
      method:'get',
      withCredentials:true,
      params:{orderId:orderId},
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
  },
  //确认收货
  confirmRev(orderId){
    return axios({
      url:url.confirmRev,
      method:'get',
      withCredentials:true,
      params:{orderId:orderId},
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
  },
  getAddressById(id) {
    var params = {
      id:id
    }
    return axios({
      url:url.viewAddress,
      method:'get',
      withCredentials:true,
      params:params,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
  },
  getAddressList(){
    return axios({
      url:url.addressList,
      method:'get',
      withCredentials:true,
      params:{},
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
  },
  createOrder(orderParams){
    //console.log(orderParams);
    return axios({
      url:url.createOrder,
      method:'post',
      withCredentials:true,
      data: orderParams
    })
  },


  /**
   * @desp 创建地址.
   */
  addAddress(addPrams){
    return axios({
      url:url.addAddr,
      method:'post',
      withCredentials:true,
      params:addPrams,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
  }


}
