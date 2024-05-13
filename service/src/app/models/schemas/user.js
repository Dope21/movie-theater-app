import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: null },
  phone: { type: String, default: null },
}, {
  versionKey: false,
  timestamps: true,
})

const userModel = mongoose.model('users', userSchema)

export default userModel
