const RegisterDistrict = require('../../domains/repository/district/entities/RegisterDistrict');

class CreateDistrictUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute(payload) {
    try {
      const registerDistrict = new RegisterDistrict(payload);
      await this._districtRepository.validateNameDoesNotExist(registerDistrict.name);
      await this._districtRepository.addDistrict(registerDistrict.name);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CreateDistrictUseCase;
