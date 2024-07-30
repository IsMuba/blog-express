// 默认配置
module.exports = {
  WHITELIST: [
    // 免登录的白名单
    '/adminapi/user/reg',
    '/adminapi/user/login',
    '/adminapi/user/captcha',
    /^\/webapi\// // 如果以 /webapi/ 开头的接口，都免登录
  ],
  JWT_EXPIRES: '1h', // token过期时间，60s为60秒，1h为1小时，1d为1天
  SHOW_DETAILED_ERROR: true, // 是否显示服务端的详细错误
  KEEP_OLD_SOURCE: false, // 是否保留旧的资源
  IMG_QUANTITY_LIMIT: 10 // 上传图片数量限制
}
