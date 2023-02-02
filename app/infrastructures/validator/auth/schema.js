const Joi = require('joi');

const signUpPayloadSchema = Joi.object({
  full_name: Joi.string().min(1).required(),
  phone_number: Joi.string().min(9).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createAuthPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { signUpPayloadSchema, createAuthPayloadSchema };
