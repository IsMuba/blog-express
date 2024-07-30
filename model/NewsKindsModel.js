const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id: String,
  userId: {
    type: String,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
    unique: true, // 确保唯一性。切记：添加或删除该属性，需要将老的集合删除！！！
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    trim: true
  },
  createTime: Date,
  updateTime: Date
})

const Model = mongoose.model('news-kinds', Schema)

module.exports = Model
