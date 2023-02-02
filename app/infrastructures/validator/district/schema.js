const Joi = require('joi');

const createDistrictPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const updateDistrictParamsSchema = Joi.object({
  id: Joi.string().required(),
});

const updateDistrictPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  createDistrictPayloadSchema,
  updateDistrictParamsSchema,
  updateDistrictPayloadSchema,
};
