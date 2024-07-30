const Model = require('../../model/UserModel')
const shortUuid = require('short-uuid')
const { removeOldSource, checkRole } = require('../../util/index')

const Service = {
  reg: async ({ username, password }) => {
    const id = shortUuid.generate()
    const createTime = new Date()

    return Model.create({
      id,
      username,
      password,
      createTime,
      updateTime: createTime
    })
  },
  login: async ({ username, password }) => {
    return Model.findOne({
      username,
      password
    })
  },
  upload: async ({ id, username, gender, introduction, avatar }) => {
    const obj = {
      id,
      username,
      gender,
      introduction,
      updateTime: new Date()
    }
    if (avatar) {
      obj.avatar = avatar
    }

    return Model.findOneAndUpdate({ id }, obj).then((oldDoc) => {
      if (!oldDoc) return

      removeOldSource({
        oldDoc,
        keys: ['avatar'],
        isDelete: false,
        newDoc: {
          avatar
        }
      })
    })
  },
  add: async (params, userId) => {
    const id = shortUuid.generate()
    const createTime = new Date()

    await checkRole(Model, userId)

    return Model.create({
      ...params,
      id,
      createTime,
      updateTime: createTime
    })
  },
  get: async ({ id }) => {
    return id ? Model.findOne({ id }) : Model.find()
  },
  delete: async (id, userId) => {
    await checkRole(Model, userId)

    return Model.findOneAndDelete({ id }).then((oldDoc) => {
      if (!oldDoc) return

      removeOldSource({ oldDoc, keys: ['avatar'] })
    })
  },
  put: async (id, body, userId) => {
    await checkRole(Model, userId)

    return Model.updateOne(
      { id },
      {
        ...body,
        updateTime: new Date()
      }
    )
  }
}

module.exports = Service
