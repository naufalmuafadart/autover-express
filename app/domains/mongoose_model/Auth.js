const mongoose = require('mongoose');

const { Schema } = mongoose;

const authSchema = new Schema({
  refresh_token: {
    type: String,
    require: [true, 'Refresh token does not exist'],
  },
}, { timestamps: true });

module.exports = mongoose.model('auth', authSchema);
