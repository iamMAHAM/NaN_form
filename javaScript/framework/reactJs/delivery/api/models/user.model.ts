import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type:  String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    default: 'M'
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type:  Number,
    required: true
  },
  role: {
    type:  String,
    required: true
  },
  avatar: {
    type:  String,
    required: false,
    default: 'https://google.com'
  },
  address: {
    type:  String,
    required: true,
  },
  phoneNumber: {
    type:  Number,
    required: true
  },
  isBlocked: {
    type:  Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
})

export default model('User', userSchema)