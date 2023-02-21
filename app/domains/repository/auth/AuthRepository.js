/* eslint-disable no-unused-vars */

class AuthRepository {
  async addAuth(payload) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateRefreshTokenExist(refreshToken) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthRepository;
