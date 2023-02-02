class CreateDistrictUseCase {
  constructor({ districtRepository, districtValidator }) {
    this._districtRepository = districtRepository;
    this._districtValidator = districtValidator;
  }

  async execute(payload) {
    try {
      await this._districtValidator.validateCreateDistrictPayload(payload);
      const { name } = payload;
      await this._districtRepository.validateNameDoesNotExist(name);
      await this._districtRepository.addDistrict(name);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CreateDistrictUseCase;
