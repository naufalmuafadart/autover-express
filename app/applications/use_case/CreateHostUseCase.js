class CreateHostUseCase {
  constructor({
    hostRepository,
    userRepository,
    mongooseValidator,
  }) {
    this._hostRepository = hostRepository;
    this._userRepository = userRepository;
    this._mongooseValidator = mongooseValidator;
  }

  async execute(payload) {
    try {
      const { user_id, district } = payload;
      this._mongooseValidator.validateId(user_id);
      await this._userRepository.validateIdExist(user_id);
      await this._hostRepository.validateUserIsNotAHost(user_id);
      await this._hostRepository.addHost({ user_id, district });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CreateHostUseCase;
