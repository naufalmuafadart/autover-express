/* eslint-disable no-unused-vars */

class AuthValidator {
  async validateCreateAuthPayload(payload) {
    throw Error('AUTH_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  }

  async validateUpdateAuthPayload(payload) {
    throw Error('AUTH_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthValidator;
