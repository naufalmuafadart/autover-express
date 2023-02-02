class ReadCheckIsHostUseCase {
  constructor({ hostRepository, hostValidator, mongooseValidator }) {
    this._hostValidator = hostValidator;
    this._hostRepository = hostRepository;
    this._mongooseValidator = mongooseValidator;
  }

  async execute(params) {
    try {
      await this._hostValidator.validateReadCheckIsHostParams(params);
      this._mongooseValidator.validateId(params.id);
      return this._hostRepository.checkIsUserAHost(params.id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ReadCheckIsHostUseCase;
