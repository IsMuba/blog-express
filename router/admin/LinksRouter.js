const express = require('express')
const router = express.Router()
const Controller = require('../../controller/admin/LinksController')
const { imgSingleUpload } = require('../../util/multer')

const moduleName = '/links'

router.post(moduleName, imgSingleUpload, Controller.add)
router.get(moduleName, Controller.get)
router.get(`${moduleName}/:id`, Controller.get)
router.put(`${moduleName}/:id`, imgSingleUpload, Controller.put)
router.post(`${moduleName}/publish`, Controller.publish)
router.delete(`${moduleName}/:id`, Controller.delete)

module.exports = router
