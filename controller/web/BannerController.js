const Service = require('../../service/web/BannerService')

const Controller = {
  get: async (req, res) => {
    Service.get(req.params)
      .then((data) => {
        res.success({ data })
      })
      .catch((error) => {
        res.fail({ error })
      })
  }
}

module.exports = Controller
