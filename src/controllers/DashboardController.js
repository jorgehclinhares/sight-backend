const DashboardRepository = require('../repositories/DashboardRepository')

module.exports = {
  async show(req, res) {
    let data = { status: 400, success: false, message: 'Email não informado.', data: {} }

    const projects = await DashboardRepository.show()

    if (projects) {
      data = { status: 200, success: true, message: '', data: projects }
    }

    return res.status(data.status).json(data)
  }
}