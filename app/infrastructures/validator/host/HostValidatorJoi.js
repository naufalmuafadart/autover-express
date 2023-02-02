const { getCheckIsHostParamsSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const HostValidator = require('../../../applications/validator/HostValidator');

class HostValidatorJoi extends HostValidator {
  async validateCheckIsHostParams(params) {
    try {
      await getCheckIsHostParamsSchema.validateAsync(params);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = HostValidatorJoi;
