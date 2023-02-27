const UpdateAuth = require('../../domains/repository/auth/entities/UpdateAuth');

class UpdateAuthUseCase {
  constructor({
    authRepository, authenticationTokenManager,
  }) {
    this._authRepository = authRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    try {
      const updateAuth = new UpdateAuth(payload);
      this._authenticationTokenManager.verifyRefreshToken(updateAuth.refresh_token);
      await this._authRepository.validateRefreshTokenExist(updateAuth.refresh_token);
      const jwtPayload = this._authenticationTokenManager
        .verifyRefreshToken(updateAuth.refresh_token);
      return this._authenticationTokenManager.createAccessToken({ id: jwtPayload.id });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UpdateAuthUseCase;
