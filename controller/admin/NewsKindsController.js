const Service = require('../../service/admin/NewsKindsService')

const Controller = {
  add: async (req, res) => {
    Service.add({
      userId: res.userId,
      ...req.body
    })
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  get: async (req, res) => {
    Service.get(req.params, res.userId)
      .then((data) => {
        res.success({ data })
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  put: async (req, res) => {
    const id = req.params.id
    Service.put(
      {
        id,
        ...req.body
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
