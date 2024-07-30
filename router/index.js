// admin
const userRouterAdmin = require('./admin/UserRouter')
const newsRouterAdmin = require('./admin/NewsRouter')
const productRouterAdmin = require('./admin/ProductRouter')
const bannerRouterAdmin = require('./admin/BannerRouter')
const newsKindsRouterAdmin = require('./admin/NewsKindsRouter')
const linksRouterAdmin = require('./admin/LinksRouter')

// web
const newsRouterWeb = require('./web/NewsRouter')
const productRouterWeb = require('./web/ProductRouter')
const bannerRouterWeb = require('./web/BannerRouter')
const linksRouterWeb = require('./web/LinksRouter')

const initRouter = (app) => {
  // admin
  app.use('/adminapi', userRouterAdmin)
  app.use('/adminapi', newsRouterAdmin)
  app.use('/adminapi', productRouterAdmin)
  app.use('/adminapi', bannerRouterAdmin)
  app.use('/adminapi', newsKindsRouterAdmin)
  app.use('/adminapi', linksRouterAdmin)

  // web
  app.use('/webapi', newsRouterWeb)
  app.use('/webapi', productRouterWeb)
  app.use('/webapi', bannerRouterWeb)
  app.use('/webapi', linksRouterWeb)
}

module.exports = initRouter
