import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name: {
    /* The name of this company */

    type: String,
    required: [true, 'Please provide a name for this company.'],
    unique: true,
    maxlength: 120,
    trim: true,
  },
  logo_url: {
    /* Url to company image */

    required: true,
    type: String,
  },
  description: {
    /* Short description of the company */

    type: String,
    required: true,
  },
  owner_user_id: {
    /* The owner of this company */

    type: Number,
    required: true,
  },
  created_user_id: {
    /* The user id who created this company */

    type: Number,
    required: true,
  },
  updated: {
    /* Company updated at date */

    type: Date,
    default: Date.now,
  },
  created: {
    /* Company created at date */

    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Company ||
  mongoose.model('Company', CompanySchema)
