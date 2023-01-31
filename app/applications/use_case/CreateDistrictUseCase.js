class CreateDistrictUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute(name) {
    await this._districtRepository.addDistrict(name);
  }
}

module.exports = CreateDistrictUseCase;
