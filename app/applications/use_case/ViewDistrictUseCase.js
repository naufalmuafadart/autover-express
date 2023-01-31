class ViewDistrictUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute() {
    return this._districtRepository.getDistricts();
  }
}

module.exports = ViewDistrictUseCase;
