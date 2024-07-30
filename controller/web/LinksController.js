const Service = require('../../service/web/LinksService')

const Controller = {
  get: async (req, res) => {
    Service.get(req.params, req.query)
      .then((data) => {
        res.success({ data })
      })
      .catch((error) => {
        res.fail({ error })
      })
  }
}

module.exports = Controller
