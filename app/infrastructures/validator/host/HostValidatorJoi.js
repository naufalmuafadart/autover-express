const { updateHostPayloadSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const HostValidator = require('../../../applications/validator/HostValidator');

class HostValidatorJoi extends HostValidator {
  async validateUpdateHostPayload(payload) {
    try {
      await updateHostPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = HostValidatorJoi;
