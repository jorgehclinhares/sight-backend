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
