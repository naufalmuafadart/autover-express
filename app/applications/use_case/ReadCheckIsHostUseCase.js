class ReadCheckIsHostUseCase {
  constructor({
    hostRepository, mongooseValidator, authenticationTokenManager,
  }) {
    this._hostRepository = hostRepository;
    this._mongooseValidator = mongooseValidator;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(AuthorizationHeader) {
    try {
      const token = this._authenticationTokenManager
        .getTokenFromAuthorizationHeader(AuthorizationHeader);
      const jwtPayload = this._authenticationTokenManager.verifyAccessToken(token);
      this._mongooseValidator.validateId(jwtPayload.id);
      return this._hostRepository.checkIsUserAHost(jwtPayload.id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ReadCheckIsHostUseCase;
