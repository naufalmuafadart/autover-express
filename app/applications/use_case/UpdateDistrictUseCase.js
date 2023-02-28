const UpdateDistrict = require('../../domains/repository/district/entities/UpdateDistrict');

class UpdateDistrictUseCase {
  constructor({ districtRepository }) {
    this._districtRepository = districtRepository;
  }

  async execute(params, payload) {
    try {
      const updateDistrict = new UpdateDistrict(params, payload);
      const { id, name } = updateDistrict;
      await this._districtRepository.validateIdExist(id);
      await this._districtRepository.validateNameDoesNotExist(name);
      await this._districtRepository.editDistrict(id, name);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UpdateDistrictUseCase;
