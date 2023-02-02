const { createUserPayloadSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const UserValidator = require('../../../applications/validator/UserValidator');

class UserValidatorJoi extends UserValidator {
  async validateCreateUserPayload(payload) {
    try {
      await createUserPayloadSchema.validateAsync(payload);
    } catch (e) {
      throw new InvariantError(e.message);
    }
  }
}

module.exports = UserValidatorJoi;
