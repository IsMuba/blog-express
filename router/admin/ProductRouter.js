const express = require('express')
const router = express.Router()
const Controller = require('../../controller/admin/ProductController')
const { imgFieldsUpload } = require('../../util/multer')

const moduleName = '/product'

router.post(moduleName, imgFieldsUpload, Controller.add)
router.get(moduleName, Controller.get)
router.get(`${moduleName}/:id`, Controller.get)
router.put(`${moduleName}/:id`, imgFieldsUpload, Controller.put)
router.post(`${moduleName}/publish`, Controller.publish)
router.delete(`${moduleName}/:id`, Controller.delete)

module.exports = router
