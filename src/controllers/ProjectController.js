const ProjectRepository = require('../repositories/ProjectRepository')

module.exports = {
  async index(req, res) {
    const user_id = req.user_id
    const projects = await ProjectRepository.index({ user: user_id }, true)

    if (!projects) {
      return res.status(404).json({ success: false, message: 'Projeto(s) não encontrado(s).', data: {} })
    }

    return res.status(200).json({ success: 200, message: '', data: projects })
  },
  async store(req, res) {
    const { name, user } = req.body;

    const project = await ProjectRepository.store({ name, user })

    if (!project) {
      return res.status(404).json({ success: false, message: 'Não foi possível salvar o projeto.', data: {} })
    }

    return res.status(200).json({ success: 200, message: 'Projeto salvo com sucesso.', data: project })
  }
}