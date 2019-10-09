const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: false, required: true },
  name: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true }
})

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model('User', userSchema)
