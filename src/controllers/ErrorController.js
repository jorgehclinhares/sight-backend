const ErrorRepository = require('../repositories/ErrorRepository')
const ProjectRepository = require('../repositories/ProjectRepository')
const moment = require('moment')

module.exports = {
  async store(req, res) {
    const {
      name,
      lineNumber,
      functionName,
      columnNumber,
      browser,
      os,
      stackTrace,
      project
    } = req.body

    let { createdAt } = req.body
    createdAt = moment(createdAt, 'YYYY-MM-DD HH:mm:ss').format()

    const errorRegistered = await ErrorRepository.index({
      project,
      name,
      lineNumber,
      functionName,
      columnNumber,
      resolved: false
    })

    let error = null

    if (errorRegistered) {
      errorRegistered.count = errorRegistered.count + 1
      error = await ErrorRepository.update(errorRegistered._id, { count: errorRegistered.count })

      if (!error) {
        return res.status(400).json({ success: false, message: 'Não foi possível salvar este erro.', data: {} })
      }

      error = errorRegistered
    } else {
      error = await ErrorRepository.store({
        name,
        lineNumber,
        functionName,
        columnNumber,
        browser,
        os,
        stackTrace,
        project,
        createdAt
      })

      if (!error) {
        return res.status(400).json({ success: false, message: 'Não foi possível salvar este erro.', data: {} })
      }
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