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
  cover: {
    type: String,
    required: true
  },
  link: {
    required: true,
    type: String,
    maxlength: 100,
    trim: true
  },
  isPublish: {
    type: String,
    default: '0',
    enum: ['0', '1'] // 发布状态：0未发布，1已发布
  },
  sort: {
    type: Number,
    default: 1
  },
  createTime: Date,
  updateTime: Date
})

const Model = mongoose.model('out-links', Schema)

module.exports = Model
