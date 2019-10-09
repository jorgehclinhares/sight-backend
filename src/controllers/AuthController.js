const UserRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async store(req, res) {
    const { email, password } = req.body

    const user = await UserRepository.index({ email })

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário ou senha incorreto(s).', data: {} })
    }

    const correctPassword = await bcrypt.compareSync(password, user.password)

    if (!correctPassword) {
      return res.status(404).json({ success: false, message: 'Usuário ou senha incorreto(s).', data: {} })
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_PRIVATE_KEY)

    return res.status(200).json({
      success: true, message: '', data: { user, token }
    })
  }
}