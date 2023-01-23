const { signUpPayloadSchema, signInPayloadSchema } = require('./schema');
const InvariantError = require('../../../commons/exceptions/InvariantError');

const authValidator = {
  validateSignUpPayload : async (payload) => {
    try {
      await signUpPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  },
  validateSignInPayload : async (payload) => {
    try {
      await signInPayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = authValidator;
