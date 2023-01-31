const mongoose = require('mongoose');

const { Schema } = mongoose;

const districtSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Name does not exist'],
  },
}, { timestamps: true });

module.exports = mongoose.model('district', districtSchema);
