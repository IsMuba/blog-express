const fs = require('fs')
const path = require('path')
const formatFilePath = require('./formatFilePath')
const validateImgFile = require('./validateImgFile')
const { KEEP_OLD_SOURCE } = require('../config/config.default')
const { NO_PERMISSION } = require('../config/config.tips')

// 删除文件
function rmSource(dir, imgPath) {
  // eslint-disable-next-line no-undef
  let filepath = path.join(__dirname, dir, imgPath)
  try {
    let state = fs.statSync(filepath)
    if (state.isFile()) {
      fs.unlinkSync(filepath)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  // 过滤空字段，以防止数据在未更改的情况下被置空
  filterEmpty: (obj = {}) =>
    Object.keys(obj)
      .filter(
        (key) => obj[key] !== null && obj[key] !== undefined && obj[key] !== ''
      )
      .reduce((acc, key) => {
        acc[key] = obj[key]
        return acc
      }, {}),
  // 编辑上传了新图片，则删除旧图片
  removeOldSource: async ({
    oldDoc,
    keys = ['cover', 'album'],
    dir = '../public',
    isDelete = true,
    newDoc = {}
  }) => {
    // 如果需要保留老的资源，则返回
    if (KEEP_OLD_SOURCE) return

    // 如果没有旧文档，则返回
    if (!oldDoc) return

    // 如果是删除数据
    if (isDelete) {
      keys.forEach((key) => {
        if (oldDoc[key]) {
          let file = oldDoc[key]
          if (typeof file === 'string') {
            rmSource(dir, file)
          }
          if (Array.isArray(file)) {
            file.forEach((t) => rmSource(dir, t))
          }
        }
      })
    } else {
      // 如果是更新数据
      keys.forEach((key) => {
        if (oldDoc[key]) {
          let file = oldDoc[key]
          if (typeof file === 'string' && newDoc[key] && newDoc[key] !== file) {
            rmSource(dir, file)
          }
          if (Array.isArray(file)) {
            let arr = file.filter(
              (t) => !(newDoc[key] && newDoc[key].includes(t))
            )
            arr.forEach((t) => rmSource(dir, t))
          }
        }
      })
    }
  },
  // 格式化文件：针对单张图片。校验图片格式与大小，并格式化图片路径
  formatFile: (req, key = 'file') => {
    const { file, files } = req
    let error = null

    // 情形一：路由中使用的 imgSingleUpload，图片信息中在 file 字段中。
    let cover = ''
    if (file) {
      error = validateImgFile([file])
      if (error) {
        return { error }
      }

      cover = formatFilePath(file)
    }

    // 情形二：路由中使用的 imgFieldsUpload，图片信息中在 files 字段中。
    if (files && files[key]) {
      error = validateImgFile(files[key])
      if (error) {
        return { error }
      }

      cover = formatFilePath(files[key][0])
    }

    return {
      cover
    }
  },
  // 格式化文件：仅针多图，如相册。校验图片格式与大小，并格式化图片路径。如果是编辑，则需要过滤出旧值并与新值合并。
  formatFiles: ({ req, key = 'albumFiles', isAdd = true } = {}) => {
    const { files } = req
    let error = null
    let album = []
    if (files && files[key]) {
      error = validateImgFile(files[key])
      if (error) {
        return { error }
      }

      album = files[key].map((t) => formatFilePath(t))
    }

    // 如果不是新增，即编辑时，则需要过滤出旧值并与新值合并
    if (!isAdd) {
      const { album: albumStr } = req.body
      let arr = albumStr ? albumStr.split(',') : []
      // 过滤掉新上传的数据，只保留旧值
      arr = arr.filter((t) => !t.includes('blob'))
      album = album.concat(arr)
    }

    return {
      album
    }
  },
  // 校验是否为管理员角色，不是则提示权限不足
  checkRole: (Model, id) => {
    return Model.findOne({ id }).then((result) => {
      if (!result || (result && result.role !== 1)) {
        throw new Error(NO_PERMISSION)
      }
    })
  }
}
