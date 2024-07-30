const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id: String,
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 10,
    trim: true
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 100,
    trim: true,
    select: false // false表示在查询时不会返回该字段
  },
  gender: {
    type: String,
    default: '2',
    enum: ['0', '1', '2'] // 性别：2保密，1男，0女
  },
  introduction: {
    type: String,
    maxlength: 100,
    trim: true
  },
  avatar: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 2,
    enum: [1, 2] // 角色：1管理员，2普通用户
  },
  createTime: Date,
  updateTime: Date
})

const Model = mongoose.model('users', Schema)

module.exports = Model
