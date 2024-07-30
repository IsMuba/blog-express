const { IMG_SIZE_LIMIT, IMG_FORMAT_LIMIT } = require('../config/config.tips')

// 校验图片大小和格式
const validateImgFile = (files = [], size = 10) => {
  let error = null

  files.forEach((t) => {
    if (error) {
      return
    }
    if (t.size > 1024 * 1024 * size) {
      error = `${IMG_SIZE_LIMIT}${size}M`
      return
    }
    if (!/\.(png|jpg|jpeg|gif|svg)$/i.test(t.filename)) {
      error = IMG_FORMAT_LIMIT
      return
    }
  })

  return error ? new Error(error) : null
}

module.exports = validateImgFile
