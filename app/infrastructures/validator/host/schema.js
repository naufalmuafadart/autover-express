const Joi = require('joi');

const getCheckIsHostParamsSchema = Joi.object({
  id: Joi.string().min(24).max(24).required(),
});

module.exports = { getCheckIsHostParamsSchema };
