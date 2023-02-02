const DistrictValidator = require('../../../applications/validator/DistrictValidator');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const { createDistrictPayloadSchema } = require('./schema');

class DistrictValidatorJoi extends DistrictValidator {
  async validateCreateDistrictPayload(payload) {
    try {
      await createDistrictPayloadSchema.validateAsync(payload);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }
}

module.exports = DistrictValidatorJoi;
