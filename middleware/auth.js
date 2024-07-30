const url = require('url')
const JWT = require('../util/JWT')
const { WHITELIST, JWT_EXPIRES } = require('../config/config.default')
const { TOKEN_EXPIRED } = require('../config/config.tips')

// 路由守卫，权限校验
const auth = (app) => {
  app.use((req, res, next) => {
    // 免登录接口直接放行
    const { pathname } = url.parse(req.url, true)
    let result = WHITELIST.filter(
      (item) =>
        item === pathname || (item instanceof RegExp && item.test(pathname))
    )
    if (result.length) {
      next()
      return
    }

    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : ''
    if (token) {
      let payload = JWT.verify(token)
      if (payload) {
        const newToken = JWT.generate(
          {
            id: payload.id,
            username: payload.username
          },
          JWT_EXPIRES
        )
        res.header('Authorization', newToken)

        res.userId = payload.id
        res.username = payload.username
        next()
      } else {
        res.send({
          code: 8302,
          message: TOKEN_EXPIRED
        })
      }
    }
  })
}

module.exports = auth
