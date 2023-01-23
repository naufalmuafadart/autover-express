const User = require('../../domains/model/User');
const InvariantError = require('../../commons/exceptions/InvariantError');

class UserRepository {
  async addUser(payload) {
    const user = new User(payload);
    await user.save();
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    if (user === null) throw new InvariantError('Email not registered');
    return user;
  }

  async validateEmailExist(email) {
    const check = await User.findOne({ email });
    if (check === null) throw new InvariantError('Email not registered');
  }

  async validateEmailDoesNotExist(email) {
    const check = await User.findOne({ email });
    if (check !== null) throw new InvariantError('Email already registered');
  }

  async validatePhoneNumberDoesNotExist(phone_number) {
    const check = await User.findOne({ phone_number });
    if (check !== null) throw new InvariantError('Phone number already registered');
  }
}

module.exports = UserRepository;
