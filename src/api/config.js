var env = 'dev'
var config = {
  site:env === 'dev' ? 'm.shop.13322.com/shop/api' :
      ( env === 'test' ? 'sit.m.shop.1332255.com/shop/api':
          (env === 'prod' ? 'shop.13322.com/shop/api/' : 'shop.13322.com/shop/api/')
      ),
  imgpath : env === 'dev' ? 'http://mobile.game2.1332255.com/static/lol/' :
              ( env === 'test' ? 'http://mobile.game2.1332255.com/static/lol/':
                  (env === 'prod' ? 'http://mobile.game2.13322.com/static/lol/' : 'http://mobile.game2.13322.com/static/lol/')
              ),
  //site: env === 'dev' ? '192.168.71.56:9000' : '',
  method: ''
}
var defaultConfig = {
  cookieDomain:env === 'dev' ? "1332255.com" : "13322.com",
  terminal:4,
  concat:"http://www.71chat.com/scsf/phone/visitor.html?cmpcd=104605",
  returnUrl:"",  //支付回调地址..
  loginUrl:env === 'dev' ? "http://mgame.1332255.com/login" : "http://m.game.13322.com/login",
  regUrl:env === 'dev' ? "http://mgame.1332255.com/register" : "http://m.game.13322.com/register",
  payUrl:env === 'dev' ? "https://payh5.bbnpay.com/h5pay/way.php" : "https://payh5.bbnpay.com/h5pay/way.php",
  rechargeUrl:env === 'dev' ? "http://mgame.1332255.com/exchange" : "http://m.game.13322.com/exchange",   //回调地址用 ?url=想回调的地址....
  secondPasswordUrl:""
}

var errList = {
  rightPhone:"请输入正确的手机号码",
  userNameLen:"用户名最多20位字符",
  accountLen:"充值账号最多80位字符"
}
//正则表
var regList = {
  ImgCode: /^[0-9a-zA-Z]{4}$/,
  SmsCode: /^\d{4}$/,
  MailCode: /^\d{4}$/,
  UserName: /^[\w|\d]{4,16}$/,
  Password: /^[\w!@#$%^&*.]{6,16}$/,
  Mobile: /^1[0-9]{10}$/,  //不验证第二位.
  RealName: /^[\u4e00-\u9fa5 ]{2,10}$/,
  BankNum: /^\d{10,19}$/,
  Money: /^([1-9]\d*|0)$/,
  Answer: /^\S+$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

export default{
  root:'http://'.concat(config.site, config.method),
  regList:regList,
  config:defaultConfig
}

