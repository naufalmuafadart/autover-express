class ViewEditDistrictUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute(id) {
    try {
      return this._districtRepository.getDistrict(id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ViewEditDistrictUseCase;
