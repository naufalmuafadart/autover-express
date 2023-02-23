/* istanbul ignore file */
const User = require('../app/domains/mongoose_model/User');

const UserCollectionTestHelper = {
  async addUser({
    full_name = 'John Doe',
    phone_number_country_code = 64,
    phone_number = '81212341234',
    email = 'johndoe@gmail.com',
    password = '123trhexSXDsa',
  }) {
    const user = await User({
      full_name, phone_number_country_code, phone_number, email, password,
    });
    await user.save();
  },
  async getUserByEmail(email) {
    return User.findOne({ email });
  },
  async emptyCollection() {
    await User.deleteMany();
  },
};

module.exports = UserCollectionTestHelper;
