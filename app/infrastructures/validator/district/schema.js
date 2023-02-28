const Joi = require('joi');

const viewEditDistrictParamsSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  viewEditDistrictParamsSchema,
};
