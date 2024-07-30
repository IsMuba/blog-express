const express = require('express')
const router = express.Router()
const Controller = require('../../controller/web/ProductController')

const moduleName = '/product'

router.get(moduleName, Controller.get)
router.get(`${moduleName}/:id`, Controller.get)

module.exports = router
