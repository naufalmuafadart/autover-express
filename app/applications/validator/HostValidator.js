/* eslint-disable no-unused-vars */

class HostValidator {
  async validateCreateHostPayload(params) {
    throw Error('HOST_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  }

  async validateUpdateHostPayload(payload) {
    throw Error('HOST_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = HostValidator;
