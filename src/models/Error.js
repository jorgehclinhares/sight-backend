const mongoose = require('mongoose')

const errorSchema = new mongoose.Schema({
  browser: {
    name: String,
    version: Number
  },
  os: {
    name: String,
    version: Number
  },
  stackTrace: [],
  datetime: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  resolved: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Error', errorSchema)