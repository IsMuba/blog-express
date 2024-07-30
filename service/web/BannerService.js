const Model = require('../../model/BannerModel')
const UserModel = require('../../model/UserModel')

const Service = {
  get: async ({ id }) => {
    const adminUser = await UserModel.findOne({ username: 'admin' })

    if (id) {
      return Model.findOne({ id, userId: adminUser.id })
    }

    let regs = [{ isPublish: '1' }, { userId: adminUser.id }]
    let conditions = {
      $and: regs
    }
    return Model.find(conditions).sort({ updateTime: -1 })
  }
}

module.exports = Service
