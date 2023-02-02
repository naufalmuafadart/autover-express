class UpdateDistrictUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute(id, name) {
    try {
      await this._districtRepository.editDistrict(id, name);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UpdateDistrictUseCase;
