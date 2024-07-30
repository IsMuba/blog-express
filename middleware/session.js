const expressSession = require('express-session')

// 设置 session
const session = (app) => {
  app.use(
    expressSession({
      secret: 'muba', // 用于对 session 进行加密
      resave: false, // 强制保存 session 即使它并没有被修改
      saveUninitialized: true, // 强制将未初始化的 session 存储
      cookie: {
        maxAge: 1000 * 60 * 60, // 设置 session 的有效时间
        secure: false // 如果为 true，则 cookie 仅在 https 连接中传输
      },
      rolling: true // 每次请求时，重置 session 的有效时间（默认为false）
    })
  )
}

module.exports = session
