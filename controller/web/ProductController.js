const Service = require('../../service/web/ProductService')

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
