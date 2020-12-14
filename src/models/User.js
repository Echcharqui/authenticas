const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    max: 25,
    min: 3
  },
  password: {
    type: String,
    unique: true,
    required: true,
    max: 25,
    min: 6
  },
  PhotoUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', UserSchema)
