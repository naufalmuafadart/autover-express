class UpdateAuthUseCase {
  constructor({
    authRepository, authValidator, authenticationTokenManager,
  }) {
    this._authRepository = authRepository;
    this._authValidator = authValidator;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    try {
      await this._authValidator.validateUpdateAuthPayload(payload);
      const { refresh_token } = payload;
      await this._authenticationTokenManager.verifyRefreshToken(refresh_token);
      await this._authRepository.validateRefreshTokenExist(refresh_token);
      const jwtPayload = await this._authenticationTokenManager
        .verifyRefreshToken(refresh_token);
      return this._authenticationTokenManager.createAccessToken({ id: jwtPayload.id });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UpdateAuthUseCase;
