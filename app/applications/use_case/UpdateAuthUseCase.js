class UpdateAuthUseCase {
  constructor({ authRepository, authValidator, authenticationTokenManager }) {
    this._authRepository = authRepository;
    this._authValidator = authValidator;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    try {
      await this._authValidator.validateUpdateAuthPayload(payload);
      await this._authRepository.validateRefreshTokenExist(payload.token);
      const jwtPayload = await this._authenticationTokenManager
        .verifyRefreshToken(payload.refresh_token);
      return this._authenticationTokenManager.createAccessToken({ id: jwtPayload.id });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UpdateAuthUseCase;
