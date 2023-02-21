const { updateAuthPayloadSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const AuthValidator = require('../../../applications/validator/AuthValidator');

class AuthValidatorJoi extends AuthValidator {
  async validateUpdateAuthPayload(payload) {
    try {
      await updateAuthPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = AuthValidatorJoi;
