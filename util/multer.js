// 图片上传
const multer = require('multer')
const path = require('path')
const dayjs = require('dayjs')
const { mkdirp } = require('mkdirp')
const shortUuid = require('short-uuid')
const { IMG_QUANTITY_LIMIT } = require('../config/config.default')

const storage = (imgDir) => {
  return multer.diskStorage({
    // 定义上传目录
    destination: async (req, file, cb) => {
      const day = dayjs().format('YYYYMMDD')
      const dir = imgDir + day
      await mkdirp(dir)
      cb(null, dir) // 上传之前目录必须存在
    },
    // 定义文件名
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname)
      const id = shortUuid.generate()
      cb(null, id + Date.now() + extname)
    }
  })
}

const upload = (imgDir) => multer({ storage: storage(imgDir) })

// 单个图片上传，如封面
const imgSingleUpload = upload('public/upload/images/').single('file')

// 多文件上传，如封面+相册
const imgFieldsUpload = upload('public/upload/images/').fields([
  { name: 'file', maxCount: 1 },
  { name: 'albumFiles', maxCount: IMG_QUANTITY_LIMIT }
])

module.exports = {
  upload,
  imgSingleUpload,
  imgFieldsUpload
}
