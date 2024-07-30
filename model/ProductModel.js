const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id: String,
  userId: {
    type: String,
    select: false
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true
  },
  introduction: {
    type: String,
    minlength: 0,
    maxlength: 100,
    trim: true
  },
  detail: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
    trim: true
  },
  cover: {
    type: String,
    required: true
  },
  album: Array,
  content: {
    type: String,
    maxlength: 10000
  },
  category: {
    type: String,
    default: '0',
    enum: ['0', '1'] // 0公司项目，1个人项目
  },
  link: {
    type: String,
    maxlength: 100,
    trim: true
  },
  isPublish: {
    type: String,
    default: '0',
    enum: ['0', '1'] // 发布状态：0未发布，1已发布
  },
  createTime: Date,
  updateTime: Date
})

const Model = mongoose.model('products', Schema)

module.exports = Model
