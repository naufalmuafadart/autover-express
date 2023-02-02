class UpdateDistrictUseCase {
  constructor({ districtRepository, districtValidator }) {
    this._districtRepository = districtRepository;
    this._districtValidator = districtValidator;
  }

  async execute(params, payload) {
    try {
      await this._districtValidator.validateUpdateDistrictParams(params);
      await this._districtValidator.validateUpdateDistrictPayload(payload);
      const { id } = params;
      const { name } = payload;
      await this._districtRepository.validateNameDoesNotExist(name);
      await this._districtRepository.editDistrict(id, name);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UpdateDistrictUseCase;
