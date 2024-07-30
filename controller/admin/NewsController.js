const Service = require('../../service/admin/NewsService')
const { formatFile, formatFiles } = require('../../util/index')

const Controller = {
  add: async (req, res) => {
    const { cover, error } = formatFile(req)
    if (error) {
      return res.fail({ error })
    }
    const { album, error: error2 } = formatFiles({ req })
    if (error2) {
      return res.fail({ error: error2 })
    }

    Service.add({
      userId: res.userId,
      ...req.body,
      cover,
      album
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
    const { album, error: error2 } = formatFiles({ req, isAdd: false })
    if (error2) {
      return res.fail({ error: error2 })
    }

    const id = req.params.id
    Service.put(
      id,
      {
        ...req.body,
        cover,
        album
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
