const UserRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  authenticated(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(400).json({ success: false, message: 'Authorization não informado.', data: {} })
    }

    const bearer = authorization.split(' ')[0].toLowerCase().trim()

    if (bearer !== 'bearer') {
      return res.status(400).json({ success: false, message: 'Authorization inválido.', data: {} })
    }

    const token = authorization.split('Bearer').pop().trim()

    try {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user_id = tokenDecoded.user_id
      next()
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Token inválido ou expirado.', data: {} })
    }
  }
}