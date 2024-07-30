const Model = require('../../model/LinksModel')
const { filterEmpty } = require('../../util/index')
const UserModel = require('../../model/UserModel')

const Service = {
  get: async ({ id }, query = {}) => {
    const adminUser = await UserModel.findOne({ username: 'admin' })

    // 单个查询
    if (id) {
      return Model.findOne({ id, userId: adminUser.id })
    }

    // 批量查询（条件模糊查询 + 分页查询）
    let { currentPage = 1, pageSize = 10, title } = filterEmpty(query)
    currentPage = Number(currentPage)
    pageSize = Number(pageSize)
    let regs = [
      { title: new RegExp(title) },
      { isPublish: '1' },
      { userId: adminUser.id }
    ]

    let conditions = {
      $and: regs
    }
    let result = await Model.find(conditions)
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
  }
}

module.exports = Service
