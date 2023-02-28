class ViewEditDistrictUseCase {
  constructor({ districtRepository, mongooseValidator }) {
    this._districtRepository = districtRepository;
    this._mongooseValidator = mongooseValidator;
  }

  async execute(params) {
    try {
      this._verifyParams({ id: params.id });
      const { id } = params;
      await this._mongooseValidator.validateId(id);
      await this._districtRepository.validateIdExist(id);
      return this._districtRepository.getDistrict(id);
    } catch (e) {
      throw e;
    }
  }

  _verifyParams({ id }) {
    if (typeof id === 'undefined' || id === null) {
      throw new Error('VIEW_EDIT_DISTRICT_USE_CASE.ID_NOT_FOUND');
    }
  }
}

module.exports = ViewEditDistrictUseCase;
