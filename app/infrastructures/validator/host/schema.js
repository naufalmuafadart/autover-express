const Joi = require('joi');

const createHostPayloadSchema = Joi.object({
  district_id: Joi.string().required(),
});

const updateHostPayloadSchema = Joi.object({
  full_name: Joi.string().required(),
  district_id: Joi.string().required(),
  phone_number: Joi.string().min(9).max(12).pattern(/^[0-9]+$/)
    .required(),
});

module.exports = { createHostPayloadSchema, updateHostPayloadSchema };
