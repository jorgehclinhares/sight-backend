const UserRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')

module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;
    let hashPassword = bcrypt.hashSync(password, 10);

    let data = { status: 400, success: false, message: 'Email não informado.', data: {} }

    const user = await UserRepository.store({ email, name, password: hashPassword })

    if (user) {
      data = { status: 200, success: true, message: '', data: user }
    }

    return res.status(data.status).json(data)
  }
}