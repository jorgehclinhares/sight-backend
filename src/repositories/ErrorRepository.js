const Error = require('../models/Error')
const Project = require('../models/Project')

module.exports.store = async (error) => {
  let newError = null

  if (error) {
    const project = await Project.findById(error.project)

    if (project) {
      newError = await Error.create(error)
    }
  }

  return newError
}

module.exports.index = async (filter, multiple = false) => {
  let error = null;
  if (multiple === false) {
    error = Error.findOne(filter)
  } else {
    error = Error.find(filter)
  }
  return error
}
