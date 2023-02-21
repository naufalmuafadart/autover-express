class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);
    this._id = payload._id;
    this.full_name = payload.full_name;
    this.phone_number_country_code = payload.phone_number_country_code;
    this.phone_number = payload.phone_number;
    this.email = payload.email;
    this.password = payload.password;
  }

  _verifyPayload({
    _id, full_name, phone_number_country_code, phone_number, email, password,
  }) {
    // Check all required property is existed
    if (_id === null || typeof _id === 'undefined') {
      throw new Error('REGISTERED_USER_ENTITY.NOT_CONTAIN_ID');
    }

    if (full_name === null || typeof full_name === 'undefined') {
      throw new Error('REGISTERED_USER_ENTITY.NOT_CONTAIN_FULL_NAME');
    }

    if (phone_number_country_code === null || typeof phone_number_country_code === 'undefined') {
      throw new Error('REGISTERED_USER_ENTITY.NOT_CONTAIN_PHONE_NUMBER_COUNTRY_CODE');
    }

    if (phone_number === null || typeof phone_number === 'undefined') {
      throw new Error('REGISTERED_USER_ENTITY.NOT_CONTAIN_PHONE_NUMBER');
    }

    if (email === null || typeof email === 'undefined') {
      throw new Error('REGISTERED_USER_ENTITY.NOT_CONTAIN_EMAIL');
    }

    if (password === null || typeof password === 'undefined') {
      throw new Error('REGISTERED_USER_ENTITY.NOT_CONTAIN_PASSWORD');
    }

    // check data type
    if (typeof _id !== 'object') {
      throw new Error('REGISTERED_USER_ENTITY.ID_SHOULD_BE_AN_OBJECT');
    }

    if (typeof full_name !== 'string') {
      throw new Error('REGISTERED_USER_ENTITY.FULL_NAME_SHOULD_BE_A_STRING');
    }

    if (typeof phone_number_country_code !== 'number') {
      throw new Error('REGISTERED_USER_ENTITY.PHONE_NUMBER_COUNTRY_CODE_SHOULD_BE_A_NUMBER');
    }

    if (typeof phone_number !== 'string') {
      throw new Error('REGISTERED_USER_ENTITY.PHONE_NUMBER_SHOULD_BE_A_STRING');
    }

    if (typeof email !== 'string') {
      throw new Error('REGISTERED_USER_ENTITY.EMAIL_SHOULD_BE_A_STRING');
    }

    const emailMatcher = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailMatcher)) {
      throw new Error('REGISTERED_USER_ENTITY.EMAIL_IS_NOT_VALID');
    }

    if (typeof password !== 'string') {
      throw new Error('REGISTERED_USER_ENTITY.PASSWORD_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = RegisteredUser;
