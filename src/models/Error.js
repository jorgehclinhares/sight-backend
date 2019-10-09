const mongoose = require('mongoose')

const errorSchema = new mongoose.Schema({
  name: String,
  lineNumber: Number,
  functionName: String,
  columnNumber: String,
  fileName: String,
  browser: {
    name: String,
    version: Number
  },
  os: {
    name: String,
    version: Number
  },
  stackTrace: [],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  resolved: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 1
  },
  createdAt: Date,
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Error', errorSchema)