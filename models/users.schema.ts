import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    /* The name of this user */

    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    /* The password of this user */

    type: String,
    required: true,
  },
  fullname: {
    /* The name of this user */

    type: String,
    trim: true,
    required: true,
  },
  date_of_birth: {
    /* User date of birth */

    type: Date,
    required: true,
  },
  photo_url: {
    /* Url to user image */

    type: String,
    required: true,
  },
  email_verification: {
    /* User email verification */

    type: Boolean,
    default: false,
  },
  created_user_id: {
    /* The user id who created this user */

    type: Number,
    required: true,
  },
  updated: {
    /* User updated at date */

    type: Date,
    default: Date.now,
  },
  created: {
    /* User created at date */

    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
