const Joi = require('joi');

const createUserPayloadSchema = Joi.object({
  full_name: Joi.string().required(),
  phone_number: Joi.string().min(9).max(12).pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { createUserPayloadSchema };
