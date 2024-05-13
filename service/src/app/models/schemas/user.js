import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: null },
  phone: { type: String, default: null },
}, {
  versionKey: false,
  timestamps: true,
})

const UserModel = mongoose.model('users', userSchema)

export default UserModel
