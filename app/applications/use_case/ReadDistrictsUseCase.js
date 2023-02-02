class ReadDistrictsUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute() {
    try {
      return this._districtRepository.getDistricts();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ReadDistrictsUseCase;
