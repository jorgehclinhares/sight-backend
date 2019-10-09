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
      return res.status(400).json({ success: false, message: 'Não foi possível salvar este erro.', data: {} })
    }

    return res.status(200).json({ success: true, message: 'Erro salvo com sucesso.', data: error })
  },
  async show(req, res) {
    const { errorId } = req.params

    const error = await ErrorRepository.index({ _id: errorId })

    if (!error) {
      return res.status(404).json({ success: false, message: 'Erro não encontrado.', data: {} })
    }

    const project = await ProjectRepository.index({ _id: error.project })

    if (!project) {
      return res.status(404).json({ success: false, message: 'Projeto não encontrado.', data: {} })
    }

    return res.status(200).json({ success: true, message: '', data: { error, project } })
  },
  async update(req, res) {
    const { resolved } = req.body
    const { errorId } = req.params

    const error = await ErrorRepository.index({ _id: errorId })

    if (!error) {
      return res.status(404).json({ success: false, message: 'Erro não encontrado.', data: {} })
    }

    const errorUpdated = await ErrorRepository.update(errorId, { resolved })

    if (!errorUpdated) {
      return res.status(400).json({ success: false, message: 'Não foi possível editar o erro.', data: {} })
    } else {
      error.resolved = resolved
    }

    return res.status(200).json({ success: true, message: '', data: error })
  }
}