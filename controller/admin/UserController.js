const Service = require('../../service/admin/UserService')
const JWT = require('../../util/JWT')
const formatFilePath = require('../../util/formatFilePath')
const { JWT_EXPIRES } = require('../../config/config.default')
const { ACCOUNT_ERROR } = require('../../config/config.tips')
const { filterEmpty } = require('../../util/index')
const svgCaptcha = require('svg-captcha')

const Controller = {
  reg: async (req, res) => {
    Service.reg(req.body)
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  login: async (req, res) => {
    Service.login(req.body)
      .then((result) => {
        if (!result) {
          return res.fail({ message: ACCOUNT_ERROR })
        }

        // 生成token，并添加到响应头的 Authorization 字段中
        let { id, username, gender, introduction, avatar, role } = result
        const token = JWT.generate(
          {
            id,
            username
          },
          JWT_EXPIRES
        )
        res.header('Authorization', token)

        res.success({
          data: {
            id,
            username,
            gender,
            introduction,
            avatar,
            role
          }
        })
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  captcha: async (req, res) => {
    const captcha = svgCaptcha.create({
      width: 100,
      height: 32,
      fontSize: 36
    })
    req.session.captcha = captcha.text

    res.type('svg')
    res.send(captcha.data)
  },
  upload: async (req, res) => {
    const { username, gender, introduction } = req.body
    const avatar = formatFilePath(req.file)
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = JWT.verify(token)

    const params = {
      id: payload.id,
      username,
      gender,
      avatar,
      introduction
    }
    if (avatar) {
      params.avatar = avatar
    }

    Service.upload(params)
      .then(() => {
        res.success()
      })
      .catch(() => {
        res.fail()
      })
  },
  add: async (req, res) => {
    const {
      username,
      gender,
      introduction,
      role = 2,
      password
    } = (req.body = filterEmpty(req.body))
    const avatar = formatFilePath(req.file)

    Service.add(
      {
        username,
        gender,
        avatar,
        introduction,
        role: Number(role),
        password
      },
      res.userId
    )
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  get: async (req, res) => {
    Service.get(req.params)
      .then((data) => {
        res.success({ data })
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  put: async (req, res) => {
    const id = req.params.id
    const body = filterEmpty(req.body)
    Service.put(id, body, res.userId)
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  },
  delete: async (req, res) => {
    const id = req.params.id
    Service.delete(id, res.userId)
      .then(() => {
        res.success()
      })
      .catch((error) => {
        res.fail({ error })
      })
  }
}

module.exports = Controller
