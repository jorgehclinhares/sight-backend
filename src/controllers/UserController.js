const UserRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')

module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;
    let hashPassword = bcrypt.hashSync(password, process.env.USER_PASSWORD_SALT);

    const user = await UserRepository.store({ email, name, password: hashPassword })

    if (!user) {
      return res.status(200).json({ success: false, message: 'Não foi possível salvar o usuário.', data: user })
    }

    return res.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso.', data: user })
  }
}