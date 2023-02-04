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
  photo_profile_url: {
    type: String,
    default: 'https://firebasestorage.googleapis.com/v0/b/autover-87dfd.appspot.com/o/ic_user.png?alt=media&token=76d0aeb0-ac9f-4ed3-b2a9-378b97bd1acb',
  },
}, { timestamps: true });

module.exports = mongoose.model('host', hostSchema);
