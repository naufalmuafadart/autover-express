const DistrictValidator = require('../../../applications/validator/DistrictValidator');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const {
  createDistrictPayloadSchema,
  updateDistrictParamsSchema,
  updateDistrictPayloadSchema,
  viewEditDistrictParamsSchema,
} = require('./schema');

class DistrictValidatorJoi extends DistrictValidator {
  async validateCreateDistrictPayload(payload) {
    try {
      await createDistrictPayloadSchema.validateAsync(payload);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }

  async validateUpdateDistrictParams(params) {
    try {
      await updateDistrictParamsSchema.validateAsync(params);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }

  async validateUpdateDistrictPayload(payload) {
    try {
      await updateDistrictPayloadSchema.validateAsync(payload);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }

  async validateViewEditDistrictParams(params) {
    try {
      await viewEditDistrictParamsSchema.validateAsync(params);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }
}

module.exports = DistrictValidatorJoi;
