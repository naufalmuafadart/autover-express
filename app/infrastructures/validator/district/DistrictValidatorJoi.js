const DistrictValidator = require('../../../applications/validator/DistrictValidator');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const {
  viewEditDistrictParamsSchema,
} = require('./schema');

class DistrictValidatorJoi extends DistrictValidator {
  async validateViewEditDistrictParams(params) {
    try {
      await viewEditDistrictParamsSchema.validateAsync(params);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }
}

module.exports = DistrictValidatorJoi;
