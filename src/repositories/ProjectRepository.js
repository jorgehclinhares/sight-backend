const User = require('../models/User')
const Project = require('../models/Project')
const mongoose = require('mongoose');

module.exports.store = async (project) => {
  let newProject = null

  if (project) {
    const user = await User.findById(project.user)

    if (user) {
      newProject = await Project.create(project)
    }
  }

  return newProject
}

module.exports.index = async (filter, multiple = false) => {
  if (multiple === false) {
    project = Project.findOne(filter)
  } else {
    project = Project.find(filter)
  }
  return project
}