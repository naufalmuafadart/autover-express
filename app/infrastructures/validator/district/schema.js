const Joi = require('joi');

const createDistrictPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { createDistrictPayloadSchema };
