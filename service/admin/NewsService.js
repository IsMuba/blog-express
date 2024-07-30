const Model = require('../../model/NewsModel')
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
    let { currentPage = 1, pageSize = 10, title, category } = filterEmpty(query)
    currentPage = Number(currentPage)
    pageSize = Number(pageSize)
    let regs = [{ title: new RegExp(title) }, { userId }]
    if (category) {
      regs.push({ category })
    }
    let conditions = {
      $and: regs
    }
    let result = await Model.find(conditions)
      .sort({ updateTime: -1 })
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
    const { title, content, category, isPublish, cover, album, link } =
      filterEmpty(body)
    const obj = {
      title,
      content,
      category,
      isPublish,
      link,
      updateTime: new Date(),
      publishTime: body.publishTime || '' // 发布时间可以置空，所以不过滤
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
    // 单一删除
    if (!id.includes(',')) {
      return Model.findOneAndDelete({ id, userId }).then((oldDoc) => {
        if (!oldDoc) return

        removeOldSource({ oldDoc })
      })
    }

    // 批量删除
    let ids = id.split(',')
    let result = await Model.find({ id: { $in: ids } })
    return Model.deleteMany({ id: { $in: ids } }).then(() => {
      result.forEach((item) => {
        removeOldSource({ oldDoc: item })
      })
    })
  }
}

module.exports = Service
