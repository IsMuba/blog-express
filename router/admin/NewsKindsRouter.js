const express = require('express')
const router = express.Router()
const Controller = require('../../controller/admin/NewsKindsController')

const moduleName = '/newskinds'

router.post(moduleName, Controller.add)
router.get(moduleName, Controller.get)
router.get(`${moduleName}/:id`, Controller.get)
router.put(`${moduleName}/:id`, Controller.put)
router.delete(`${moduleName}/:id`, Controller.delete)

module.exports = router
