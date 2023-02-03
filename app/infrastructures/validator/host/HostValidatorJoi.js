const { createHostPayloadSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const HostValidator = require('../../../applications/validator/HostValidator');

class HostValidatorJoi extends HostValidator {
  async validateCreateHostPayload(payload) {
    try {
      await createHostPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = HostValidatorJoi;
