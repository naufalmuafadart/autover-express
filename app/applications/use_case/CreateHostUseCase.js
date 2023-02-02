class CreateHostUseCase {
  constructor({
    hostRepository,
    userRepository,
    districtRepository,
    mongooseValidator,
  }) {
    this._hostRepository = hostRepository;
    this._userRepository = userRepository;
    this._districtRepository = districtRepository;
    this._mongooseValidator = mongooseValidator;
  }

  async execute(payload) {
    try {
      const { user_id, district_id } = payload;

      // validate id
      this._mongooseValidator.validateId(user_id);
      this._mongooseValidator.validateId(district_id);

      // validate user
      await this._userRepository.validateIdExist(user_id);
      await this._hostRepository.validateUserIsNotAHost(user_id);

      // validate district
      await this._districtRepository.validateIdExist(district_id);

      await this._hostRepository.addHost({ user_id, district_id });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CreateHostUseCase;
