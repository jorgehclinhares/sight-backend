const User = require('../models/User')

module.exports.store = async (user) => {
  let newUser = null

  if (user) {
    newUser = await User.findOne({ email: user.email })

    if (!newUser) {
      newUser = await User.create(user)
    }
  }

  return newUser
}
