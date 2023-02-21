class RegisterAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    const { email, password } = payload;
    this.email = email;
    this.password = password;
  }

  _verifyPayload({ email, password }) {
    if (!email) {
      throw new Error('REGISTER_AUTH_ENTITY.NOT_CONTAIN_EMAIL');
    }

    if (!password) {
      throw new Error('REGISTER_AUTH_ENTITY.NOT_CONTAIN_PASSWORD');
    }

    if (typeof email !== 'string') {
      throw new Error('REGISTER_AUTH_ENTITY.EMAIL_SHOULD_BE_A_STRING');
    }

    if (typeof password !== 'string') {
      throw new Error('REGISTER_AUTH_ENTITY.PASSWORD_SHOULD_BE_A_STRING');
    }

    const emailMatcher = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailMatcher)) {
      throw new Error('REGISTER_AUTH_ENTITY.EMAIL_IS_NOT_VALID');
    }

    if (password.length < 8) {
      throw new Error('REGISTER_AUTH_ENTITY.PASSWORD_SHOULD_CONTAIN_AT_LEAST_8_CHARACTERS');
    }
  }
}

module.exports = RegisterAuth;
