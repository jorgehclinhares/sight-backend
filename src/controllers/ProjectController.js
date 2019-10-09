const ProjectRepository = require('../repositories/ProjectRepository')

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers
    const projects = await ProjectRepository.index({ user: user_id })

    let data = { status: 400, success: false, message: 'Não foi possível listar os spots.', data: {} }

    if (projects) {
      data = { status: 200, success: true, message: '', data: projects }
    }

    return res.status(data.status).json(data)
  },
  async store(req, res) {
    const { name, user } = req.body;

    let data = { status: 400, success: false, message: 'Email não informado.', data: {} }

    const project = await ProjectRepository.store({ name, user })

    if (project) {
      data = { status: 200, success: true, message: '', data: project }
    }

    return res.status(data.status).json(data)
  }
}