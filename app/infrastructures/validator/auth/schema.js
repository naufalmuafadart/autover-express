const Joi = require('joi');

const updateAuthPayloadSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

module.exports = { updateAuthPayloadSchema };
