const Joi = require('joi');

const createHostPayloadSchema = Joi.object({
  district_id: Joi.string().required(),
});

module.exports = { createHostPayloadSchema };
