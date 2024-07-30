const Model = require('../../model/NewsKindsModel')
const NewsModel = require('../../model/NewsModel')
const shortUuid = require('short-uuid')
const { RELATED_DATA_EXISTS } = require('../../config/config.tips')

const Service = {
  add: async ({ name, code, userId }) => {
    const id = shortUuid.generate()

    return Model.create({
      id,
      name,
      code,
      userId
    })
  },
  get: async ({ id }, userId) => {
    return id ? Model.findOne({ id, userId }) : Model.find({ userId })
  },
  put: async ({ id, name, code }, userId) => {
    return Model.updateOne(
      { id, userId },
      {
        name,
        code
      }
    )
  },
  delete: async (id, userId) => {
    let canRemove = true
    let result = await NewsModel.find({ category: id })
    // 判断该分类下是否有数据
    if (result.length) {
      canRemove = false
    }
    if (!canRemove) {
      return Promise.reject({
        message: RELATED_DATA_EXISTS
      })
    }

    return Model.deleteOne({ id, userId })
  }
}

module.exports = Service
