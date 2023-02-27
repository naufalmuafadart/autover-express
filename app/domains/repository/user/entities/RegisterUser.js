class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    this.full_name = payload.full_name;
    this.phone_number = payload.phone_number;
    this.email = payload.email;
    this.password = payload.password;
  }

  _verifyPayload({
    full_name, phone_number, email, password,
  }) {
    if (typeof full_name === 'undefined' || full_name === undefined || full_name == null) {
      throw new Error('REGISTER_USER_ENTITY.NOT_CONTAIN_FULL_NAME');
    }

    if (typeof phone_number === 'undefined' || phone_number === undefined || phone_number == null) {
      throw new Error('REGISTER_USER_ENTITY.NOT_CONTAIN_PHONE_NUMBER');
    }

    if (typeof email === 'undefined' || email === undefined || email == null) {
      throw new Error('REGISTER_USER_ENTITY.NOT_CONTAIN_EMAIL');
    }

    if (typeof password === 'undefined' || password === undefined || password == null) {
      throw new Error('REGISTER_USER_ENTITY.NOT_CONTAIN_PASSWORD');
    }

    if (typeof full_name !== 'string') {
      throw new Error('REGISTER_USER_ENTITY.FULL_NAME_SHOULD_BE_A_STRING');
    }

    if (typeof phone_number !== 'string') {
      throw new Error('REGISTER_USER_ENTITY.PHONE_NUMBER_SHOULD_BE_A_STRING');
    }

    if (typeof email !== 'string') {
      throw new Error('REGISTER_USER_ENTITY.EMAIL_SHOULD_BE_A_STRING');
    }

    if (typeof password !== 'string') {
      throw new Error('REGISTER_USER_ENTITY.PASSWORD_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = RegisterUser;
