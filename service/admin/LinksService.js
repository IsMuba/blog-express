const Model = require('../../model/LinksModel')
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
  get: async ({ id }, query = {}, userId) => {
    // 单个查询
    if (id) {
      return Model.findOne({ id, userId })
    }

    // 批量查询（条件模糊查询 + 分页查询）
    let { currentPage = 1, pageSize = 10, title } = filterEmpty(query)
    currentPage = Number(currentPage)
    pageSize = Number(pageSize)
    let regs = [{ title: new RegExp(title) }, { userId }]
    let conditions = {
      $and: regs
    }
    let result = await Model.find(conditions)
      .sort({ sort: 1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
    let total = await Model.countDocuments(conditions) // 注意：这里要用正则，否则是精确查询！
    let pages = Math.ceil(total / pageSize)

    return {
      records: result,
      currentPage,
      pageSize,
      total,
      pages
    }
  },
  put: async (id, body, userId) => {
    const { title, cover, isPublish, link, sort } = filterEmpty(body)
    const obj = {
      title,
      isPublish,
      link,
      sort,
      updateTime: new Date()
    }
    if (cover) {
      obj.cover = cover
    }

    return Model.findOneAndUpdate({ id, userId }, obj).then((oldDoc) => {
      if (!oldDoc) return

      removeOldSource({
        oldDoc,
        keys: ['cover'],
        isDelete: false,
        newDoc: {
          cover
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

      removeOldSource({ oldDoc, keys: ['cover'] })
    })
  }
}

module.exports = Service
