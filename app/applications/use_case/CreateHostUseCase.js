class CreateHostUseCase {
  constructor({
    hostRepository,
    userRepository,
    districtRepository,
    hostValidator,
    mongooseValidator,
    authenticationTokenManager,
  }) {
    this._hostRepository = hostRepository;
    this._userRepository = userRepository;
    this._districtRepository = districtRepository;
    this._hostValidator = hostValidator;
    this._mongooseValidator = mongooseValidator;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload, AuthorizationHeader) {
    try {
      await this._hostValidator.validateCreateHostPayload(payload);
      const { district_id } = payload;

      // get user id
      const token = this._authenticationTokenManager
        .getTokenFromAuthorizationHeader(AuthorizationHeader);
      const jwtPayload = await this._authenticationTokenManager.verifyAccessToken(token);
      const { id: user_id } = jwtPayload;

      // validate id
      this._mongooseValidator.validateId(user_id);
      this._mongooseValidator.validateId(district_id);

      // validate user
      await this._userRepository.validateIdExist(user_id);
      await this._hostRepository.validateUserIsNotAHost(user_id);

      // validate district
      await this._districtRepository.validateIdExist(district_id);

      const full_name = await this._userRepository.getUserFullName(user_id);
      const phone_number = await this._userRepository.getUserPhoneNumber(user_id);
      const phone_number_cc = await this._userRepository.getUserPhoneNumberCountryCode(user_id);
      await this._hostRepository.addHost({
        user_id, full_name, district_id, phone_number, phone_number_country_code: phone_number_cc,
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CreateHostUseCase;
