const ErrorRepository = require('../repositories/ErrorRepository')

module.exports = {
  async store(req, res) {
    const {
      browser,
      os,
      stackTrace,
      datetime,
      project
    } = req.body

    let data = { status: 400, success: false, message: 'Email não informado.', data: {} }

    const error = await ErrorRepository.store({
      browser,
      os,
      stackTrace,
      datetime,
      project
    })

    if (error) {
      data = { status: 200, success: true, message: '', data: error }
    }

    return res.status(data.status).json(data)
  }
}