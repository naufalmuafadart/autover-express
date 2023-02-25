const Joi = require('joi');

const updateDistrictParamsSchema = Joi.object({
  id: Joi.string().required(),
});

const updateDistrictPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const viewEditDistrictParamsSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  updateDistrictParamsSchema,
  updateDistrictPayloadSchema,
  viewEditDistrictParamsSchema,
};
