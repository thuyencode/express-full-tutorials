import mongoose from 'mongoose'
import { User } from 'types'

const UserSchema = new mongoose.Schema<User>({
  name: mongoose.Schema.Types.String,
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
