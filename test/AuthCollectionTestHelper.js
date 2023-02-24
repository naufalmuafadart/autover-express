/* istanbul ignore file */
const Auth = require('../app/domains/mongoose_model/Auth');

const AuthCollectionTestHelper = {
  async addAuth({ refresh_token = 'ey.payload.signature' }) {
    const auth = await Auth({ refresh_token });
    await auth.save();
  },
  async validateAuthExist(refresh_token) {
    const auth = await Auth.findOne({ refresh_token });
    if (!auth) throw new Error();
  },
  async emptyCollection() {
    await Auth.deleteMany();
  },
};

module.exports = AuthCollectionTestHelper;
