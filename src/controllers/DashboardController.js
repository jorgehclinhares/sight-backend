const DashboardRepository = require('../repositories/DashboardRepository')

module.exports = {
  async show(req, res) {
    // filter by user
    const projects = await DashboardRepository.show()

    if (!projects) {
      res.status(404).json({ success: false, message: 'Error', data: {} })
    }

    return res.status(200).json({ success: true, message: '', data: projects })
  }
}