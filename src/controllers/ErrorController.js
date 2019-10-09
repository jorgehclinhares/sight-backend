const ErrorRepository = require('../repositories/ErrorRepository')
const ProjectRepository = require('../repositories/ProjectRepository')

module.exports = {
  async store(req, res) {
    const {
      browser,
      os,
      stackTrace,
      datetime,
      project
    } = req.body

    const error = await ErrorRepository.store({
      browser,
      os,
      stackTrace,
      datetime,
      project
    })

    if (!error) {
      return res.status(404).json({ success: false, message: 'Não foi possível salvar este erro.', data: {} })
    }

    return res.status(200).json({ success: true, message: 'Erro salvo com sucesso.', data: error })
  },
  async show(req, res) {
    const { error_id } = req.params

    const error = await ErrorRepository.index({ _id: error_id })

    if (!error) {
      return res.status(404).json({ success: false, message: 'Código de erro não encontrado.', data: {} })
    }

    const project = await ProjectRepository.index({ _id: error.project })

    if (!project) {
      return res.status(404).json({ success: false, message: 'Projeto não encontrado.', data: {} })
    }

    return res.status(200).json({ success: true, message: '', data: { error, project } })
  }
}