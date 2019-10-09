const Project = require('../models/Project')

module.exports.show = async () => {
  const projects = Project.find();
  return projects
}
