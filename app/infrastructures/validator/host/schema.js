const Joi = require('joi');

const updateHostPayloadSchema = Joi.object({
  full_name: Joi.string().required(),
  district_id: Joi.string().required(),
  phone_number: Joi.string().min(9).max(12).pattern(/^[0-9]+$/)
    .required(),
});

module.exports = { updateHostPayloadSchema };
