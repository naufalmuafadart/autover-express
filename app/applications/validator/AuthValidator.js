/* eslint-disable no-unused-vars */

class AuthValidator {
  async validateSignUpPayload(payload) {
    throw Error('AUTH_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  }

  async validateCreateAuthPayload(payload) {
    throw Error('AUTH_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthValidator;
