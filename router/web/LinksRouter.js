const express = require('express')
const router = express.Router()
const Controller = require('../../controller/web/LinksController')

const moduleName = '/links'

router.get(moduleName, Controller.get)

module.exports = router
