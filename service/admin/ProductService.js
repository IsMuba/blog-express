const Model = require('../../model/ProductModel')
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
    const {
      title,
      introduction,
      detail,
      isPublish,
      cover,
      album,
      content,
      category,
      link
    } = filterEmpty(body)
    const obj = {
      title,
      introduction,
      detail,
      content,
      category,
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

    return Model.findOneAndUpdate({ id, userId }, obj).then((oldDoc) => {
      if (!oldDoc) return

      removeOldSource({
        oldDoc,
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
    return Model.findOneAndDelete({ id, userId }).then((oldDoc) => {
      if (!oldDoc) return

      removeOldSource({ oldDoc })
    })
  }
}

module.exports = Service
