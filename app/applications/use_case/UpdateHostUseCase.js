const UpdateHost = require('../../domains/repository/host/entities/UpdateHost');

class UpdateHostUseCase {
  constructor({
    hostRepository,
    districtRepository,
    mongooseValidator,
    authenticationTokenManager,
  }) {
    this._hostRepository = hostRepository;
    this._districtRepository = districtRepository;
    this._mongooseValidator = mongooseValidator;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload, AuthorizationHeader) {
    try {
      // get user id
      const token = this._authenticationTokenManager
        .getTokenFromAuthorizationHeader(AuthorizationHeader);
      const jwtPayload = this._authenticationTokenManager.verifyAccessToken(token);
      const { id: user_id } = jwtPayload;

      const updateHost = new UpdateHost(payload);
      const { full_name, district_id, phone_number } = updateHost;

      // validate id
      this._mongooseValidator.validateId(user_id);
      this._mongooseValidator.validateId(district_id);
      await this._districtRepository.validateIdExist(district_id);

      await this._hostRepository.validateUserIsAHost(user_id);
      await this._hostRepository.updateHost(
        user_id,
        { full_name, district_id, phone_number },
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UpdateHostUseCase;
