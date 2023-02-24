const DistrictRepository = require('../../domains/repository/district/DistrictRepository');
const InvariantError = require('../../commons/exceptions/InvariantError');

class DistrictRepositoryMongo extends DistrictRepository {
  constructor(District) {
    super();
    this._District = District;
  }

  async addDistrict(name) {
    const district = await new this._District({ name });
    await district.save();
  }

  async validateIdExist(id) {
    const district = await this._District.findById(id);
    if (district === null) throw new InvariantError('District id not found');
  }

  async getDistricts() {
    return this._District.find({});
  }

  async getDistrict(id) {
    const district = await this._District.findById(id);
    if (!district) throw new Error();
    return district;
  }

  async editDistrict(id, name) {
    await this._District.findByIdAndUpdate(id, { name });
  }

  async validateNameDoesNotExist(name) {
    const district = await this._District.findOne({ name });
    if (district != null) throw new InvariantError('Name is exist');
  }
}

module.exports = DistrictRepositoryMongo;
