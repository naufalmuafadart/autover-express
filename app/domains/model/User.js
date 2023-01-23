const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  full_name: {
    type: String,
    require: [true, 'full name does not exist'],
  },
  phone_number_country_code: {
    type: Number,
    require: [true, 'phone number country code does not exist'],
    default: 64,
  },
  phone_number: {
    type: String,
    require: [true, 'phone number does not exist'],
  },
  email: {
    type: String,
    require: [true, 'email does not exist'],
  },
  password: {
    type: String,
    require: [true, 'password does not exist'],
  },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
