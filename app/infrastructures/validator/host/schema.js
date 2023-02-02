const Joi = require('joi');

const createHostPayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  district_id: Joi.string().required(),
});

const getCheckIsHostParamsSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = { createHostPayloadSchema, getCheckIsHostParamsSchema };
