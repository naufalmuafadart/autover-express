const DistrictRepository = require('../../domains/district/DistrictRepository');

class DistrictRepositoryMongo extends DistrictRepository {
  constructor(District) {
    super();
    this._District = District;
  }

  async addDistrict(name) {
    const district = await new this._District({ name });
    await district.save();
  }
}

module.exports = DistrictRepositoryMongo;
