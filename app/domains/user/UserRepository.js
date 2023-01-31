/* eslint-disable no-unused-vars */

class UserRepository {
  async getUserByEmail(email) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateEmailExist(email) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateEmailDoesNotExist(email) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validatePhoneNumberDoesNotExist(phone_number) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserRepository;