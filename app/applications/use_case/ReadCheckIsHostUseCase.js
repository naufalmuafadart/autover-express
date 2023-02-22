const JWTPayload = require('../../domains/repository/jwt/entities/JWTPayload');

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
      const jwtPayloadPayload = this._authenticationTokenManager.verifyAccessToken(token);
      const jwtPayload = new JWTPayload(jwtPayloadPayload);
      this._mongooseValidator.validateId(jwtPayload.id);
      return this._hostRepository.checkIsUserAHost(jwtPayload.id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ReadCheckIsHostUseCase;
