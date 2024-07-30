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
    maxlength: 50,
    trim: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  cover: {
    type: String,
    maxlength: 100
  },
  album: Array,
  category: {
    type: String,
    required: true
  },
  isPublish: {
    type: String,
    default: '0',
    enum: ['0', '1'] // 发布状态：0未发布，1已发布
  },
  link: {
    type: String,
    maxlength: 100,
    trim: true
  },
  createTime: Date,
  updateTime: Date,
  publishTime: Date
})

const Model = mongoose.model('news', Schema)

module.exports = Model
