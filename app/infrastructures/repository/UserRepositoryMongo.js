const UserRepository = require('../../domains/repository/user/UserRepository');
const InvariantError = require('../../commons/exceptions/InvariantError');

class UserRepositoryMongo extends UserRepository {
  constructor(User) {
    super();
    this._User = User;
  }

  async addUser(payload) {
    const user = new this._User(payload);
    await user.save();
  }

  async getUserByEmail(email) {
    const user = await this._User.findOne({ email });
    if (user === null) throw new InvariantError('Email not registered');
    return user;
  }

  async getUserFullName(id) {
    const user = await this._User.findOne({ id }, 'full_name');
    if (user === null) throw new InvariantError('User not found');
    return user.full_name;
  }

  async getUserPhoneNumber(id) {
    const user = await this._User.findOne({ id }, 'phone_number');
    if (user === null) throw new InvariantError('User not found');
    return user.phone_number;
  }

  async getUserPhoneNumberCountryCode(id) {
    const user = await this._User.findOne({ id }, 'phone_number_country_code');
    if (user === null) throw new InvariantError('User not found');
    return user.phone_number_country_code;
  }

  async validateIdExist(id) {
    const user = await this._User.findById(id);
    if (user === null) throw new InvariantError('user Id not found');
  }

  async validateEmailExist(email) {
    const check = await this._User.findOne({ email });
    if (check === null) throw new InvariantError('Email not registered');
  }

  async validateEmailDoesNotExist(email) {
    const check = await this._User.findOne({ email });
    if (check !== null) throw new InvariantError('Email already registered');
  }

  async validatePhoneNumberDoesNotExist(phone_number) {
    const check = await this._User.findOne({ phone_number });
    if (check !== null) throw new InvariantError('Phone number already registered');
  }
}

module.exports = UserRepositoryMongo;
