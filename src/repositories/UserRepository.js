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

module.exports.index = async (filter, multiple = false) => {
  let user = null;
  if (multiple === false) {
    user = User.findOne(filter)
  } else {
    user = User.find(filter)
  }
  return user
}
