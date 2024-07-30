const { SHOW_DETAILED_ERROR } = require('../config/config.default')
const { ALREADY_EXISTS, VALIDATE_ERROR } = require('../config/config.tips')

// 自定义中间件，用于统一API响应格式
const tips = (app) => {
  app.use((req, res, next) => {
    res.success = ({ code = 8200, message = 'success', data = null } = {}) => {
      res.send({
        code,
        message,
        data
      })
    }

    res.fail = ({ code = 8500, message = 'fail', error = null } = {}) => {
      let obj = {
        code,
        message
      }

      // 如果为了数据安全，可以把 SHOW_DETAILED_ERROR 设为 false，不把 error 详细信息返回给前端
      if (SHOW_DETAILED_ERROR && error && JSON.stringify(error) !== '{}') {
        obj.error = error
      }

      if (error) {
        const { code, name, message } = error
        if (message) {
          obj.message = message
        }
        if (code === 11000) {
          obj.message = ALREADY_EXISTS
        }
        if (name === 'ValidationError') {
          obj.message = VALIDATE_ERROR
        }
      }

      res.send(obj)
    }

    // 继续向下执行
    next()
  })
}

module.exports = tips
