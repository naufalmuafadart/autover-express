const { signUpPayloadSchema, signInPayloadSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const AuthValidator = require('../../../applications/validator/AuthValidator');

class AuthValidatorJoi extends AuthValidator {
  async validateSignUpPayload(payload) {
    try {
      await signUpPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }

  async validateSignInPayload(payload) {
    try {
      await signInPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = AuthValidatorJoi;
