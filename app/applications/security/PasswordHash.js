/* eslint-disable no-unused-vars */

class PasswordHash {
  async hashString(text) {
    throw new Error('PASSWORD_HASH.PASSWORD_NOT_IMPLEMENTED');
  }

  validatePassword(password, hashedPassword) {
    throw new Error('PASSWORD_HASH.PASSWORD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
