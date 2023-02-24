const Host = require('../app/domains/mongoose_model/Host');

const HostCollectionTestHelper = {
  async addHost({
    user_id,
    full_name = 'John Doe',
    district_id,
    phone_number_country_code = 64,
    phone_number = '81212341234',
    photo_profile_url = 'https://firebasestorage.googleapis.com/v0/b/autover-87dfd.appspot.com/o/ic_user.png?alt=media&token=76d0aeb0-ac9f-4ed3-b2a9-378b97bd1acb'
  }) {
    const host = await Host({
      user_id,
      full_name,
      district_id,
      phone_number_country_code,
      phone_number,
      photo_profile_url,
    });
    await host.save();
  },
  async getHostByUserId(userId) {
    const host = await Host.findOne({ user_id: userId });
    if (!host) throw new Error();
    return host;
  },
  async emptyCollection() {
    await Host.deleteMany();
  },
};

module.exports = HostCollectionTestHelper;
