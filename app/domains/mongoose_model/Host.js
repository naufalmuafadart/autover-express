const mongoose = require('mongoose');

const { Schema } = mongoose;

const hostSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, 'user id does not exist'],
  },
  full_name: {
    type: String,
    require: [true, 'name does not exist'],
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, 'district does not not exist'],
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
}, { timestamps: true });

module.exports = mongoose.model('host', hostSchema);
