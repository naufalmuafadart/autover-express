const User = require('../../user/model');
const InvariantError = require('../../../exceptions/InvariantError');

const bcrypt = require('bcrypt');

const userValidator = {
  validateEmailNotRegistered : async (email) => {
    const check = await User.findOne({ email });
    if (check !== null) throw new InvariantError('Email already registered');
  },
  validateEmailIsRegistered : async (email) => {
    const check = await User.findOne({ email });
    if (check === null) throw new InvariantError('Email not registered');
  },
  validatePhoneNumberNotRegistered : async (phone_number) => {
    const check = await User.findOne({ phone_number });
    if (check !== null) throw new InvariantError('Phone number already registered');
  },
  validatePasswordIsCorrect : async (_id, password) => {
    const user = await User.findOne({ _id });
    if (!bcrypt.compareSync(password, user.password)) throw new InvariantError('Password is incorrect');
  },
};

module.exports = userValidator;