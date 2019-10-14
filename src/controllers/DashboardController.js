const DashboardRepository = require('../repositories/DashboardRepository')
const mongoose = require('mongoose')

module.exports = {
  async index(req, res) {
    console.log({ user: mongoose.Types.ObjectId(req.user_id) })
    const projects = await DashboardRepository.index({ user: mongoose.Types.ObjectId(req.user_id) })

    if (!projects) {
      res.status(404).json({ success: false, message: 'Error', data: {} })
    }

    return res.status(200).json({ success: true, message: '', data: projects })
  }
}