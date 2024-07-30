const Model = require('../../model/BannerModel')
const shortUuid = require('short-uuid')
const { filterEmpty, removeOldSource } = require('../../util/index')

const Service = {
  add: async (params) => {
    const id = shortUuid.generate()
    const createTime = new Date()

    return Model.create({
      ...params,
      id,
      createTime,
      updateTime: createTime
    })
  },
  get: async ({ id }, userId) => {
    return id
      ? Model.findOne({ id, userId })
      : Model.find({ userId }).sort({ updateTime: -1 })
  },
  put: async (id, body, userId) => {
    const { title, detail, isPublish, cover, album, link } = filterEmpty(body)
    const obj = {
      title,
      detail,
      link,
      isPublish,
      updateTime: new Date()
    }
    if (cover) {
      obj.cover = cover
    }
    if (album.length) {
      obj.album = album
    }

    // 如果不需要删除旧的资源(其他模块也一样)，代码可简写为：
    // return Model.updateOne({ id, userId }, obj)

    return Model.findOneAndUpdate({ id, userId }, obj).then((oldDoc) => {
      // 如果更新成功，oldDoc为更新前的旧文档。如果未匹配上，oldDoc 为 null
      if (!oldDoc) return

      removeOldSource({
        oldDoc,
        keys: ['cover', 'album'],
        isDelete: false,
        newDoc: {
          cover,
          album
        }
      })
    })
  },
  publish: async ({ id, isPublish }, userId) => {
    return Model.updateOne(
      { id, userId },
      {
        isPublish,
        updateTime: new Date()
      }
    )
  },
  delete: async (id, userId) => {
    // 如果不需要删除旧的资源(其他模块也一样)，代码可简写为：
    // return Model.deleteOne({ id, userId })

    return Model.findOneAndDelete({ id, userId }).then((oldDoc) => {
      if (!oldDoc) return

      removeOldSource({ oldDoc })
    })
  }
}

module.exports = Service
