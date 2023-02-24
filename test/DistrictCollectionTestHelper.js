const District = require('../app/domains/mongoose_model/District');

const DistrictCollectionTestHelper = {
  async addDistrict({ name = 'Bandung' }) {
    const district = await District({ name });
    await district.save();
  },
  async getIdByName(name) {
    const district = await District.findOne({ name });
    if (!district) throw new Error();
    return Promise.resolve(String(district._id));
  },
  async getNameById(id) {
    const district = await District.findOne({ _id: id });
    if (!district) throw new Error();
    return Promise.resolve(district.name);
  },
  async validateDistrictNameExist(name) {
    const auth = await District.findOne({ name });
    if (!auth) throw new Error();
  },
  async emptyCollection() {
    await District.deleteMany();
  },
};

module.exports = DistrictCollectionTestHelper;
