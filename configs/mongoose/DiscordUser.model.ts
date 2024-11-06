import mongoose from 'mongoose'
import { DiscordUser } from 'types'

const DiscordUserSchema = new mongoose.Schema<DiscordUser>({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  global_name: mongoose.Schema.Types.String,
})

const DiscordUserModel = mongoose.model('Discord_User', DiscordUserSchema)

export default DiscordUserModel
