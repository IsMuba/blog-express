const express = require('express')
const router = express.Router()
const Controller = require('../../controller/admin/UserController')
const { imgSingleUpload } = require('../../util/multer')

const moduleName = '/user'

router.post(`${moduleName}/reg`, Controller.reg)
router.post(`${moduleName}/login`, Controller.login)
router.get(`${moduleName}/captcha`, Controller.captcha)
router.post(`${moduleName}/upload`, imgSingleUpload, Controller.upload)
router.post(moduleName, imgSingleUpload, Controller.add)
router.get(moduleName, Controller.get)
router.get(`${moduleName}/:id`, Controller.get)
router.delete(`${moduleName}/:id`, Controller.delete)
router.put(`${moduleName}/:id`, Controller.put)

module.exports = router
