const mongoose = require('mongoose');

const { Schema } = mongoose;

const hostSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, 'user id does not exist'],
  },
  district: {
    type: String,
    require: [true, 'district does not not exist'],
  },
}, { timestamps: true });

module.exports = mongoose.model('host', hostSchema);
