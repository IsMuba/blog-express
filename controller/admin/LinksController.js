const Service = require('../../service/admin/LinksService')
const { formatFile } = require('../../util/index')
const formatFilePath = require('../../util/formatFilePath')

const Controller = {
  add: async (req, res) => {
    const cover = formatFilePath(req.file)

    Service.add({
      userId: res.userId,
      ...req.body,
      cover
    })
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  get: async (req, res) => {
    Service.get(req.params, req.query, res.userId)
      .then((data) => {
        res.success({ data })
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  put: async (req, res) => {
    const { cover, error } = formatFile(req)
    if (error) {
      return res.fail({ error })
    }

    const id = req.params.id
    Service.put(
      id,
      {
        ...req.body,
        cover
      },
      res.userId
    )
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  publish: async (req, res) => {
    Service.publish(req.body, res.userId)
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  delete: async (req, res) => {
    const id = req.params.id
    Service.delete(id, res.userId)
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  }
}

module.exports = Controller
