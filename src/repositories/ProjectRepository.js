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

module.exports.index = async (filters) => {
  const projects = await Project.find(filters);
  return projects
}