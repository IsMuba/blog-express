const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const initRouter = require('./router/index')
const auth = require('./middleware/auth')
const session = require('./middleware/session')
const tips = require('./middleware/tips')

const app = express()

// 模板引擎
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// 日志
app.use(logger('dev'))

// 使用 body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

// 设置静态文件托管
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')))

// 设置 session
session(app)

// 路由守卫
auth(app)

// 统一响应格式
tips(app)

// 注册路由
initRouter(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler 错误处理
app.use(function (err, req, res) {
  // 图片上传超过最大限制时【因为图片上传是中间件，错误无法在controller和service中捕获】
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.fail({ message: '文件上传数量超过最大限制' })
  }
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
