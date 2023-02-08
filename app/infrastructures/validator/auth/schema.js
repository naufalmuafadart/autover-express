const Joi = require('joi');

const createAuthPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const updateAuthPayloadSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

module.exports = { createAuthPayloadSchema, updateAuthPayloadSchema };
