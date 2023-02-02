class ViewEditDistrictUseCase {
  constructor({ districtRepository, districtValidator, mongooseValidator }) {
    this._districtRepository = districtRepository;
    this._districtValidator = districtValidator;
    this._mongooseValidator = mongooseValidator;
  }

  async execute(params) {
    try {
      await this._districtValidator.validateViewEditDistrictParams(params);
      const { id } = params;
      await this._mongooseValidator.validateId(id);
      await this._districtRepository.validateIdExist(id);
      return this._districtRepository.getDistrict(id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ViewEditDistrictUseCase;
