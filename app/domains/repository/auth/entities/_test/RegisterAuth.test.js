const RegisterAuth = require('../RegisterAuth');

describe('a RegisterAuth entity', () => {
  it('should throw error when payload did not contain required property', () => {
    const payload1 = {};
    const payload2 = { email: 'johndoe@gmail.com' };
    const payload3 = { password: 'SuperSecretPassword' };

    expect(() => new RegisterAuth(payload1)).toThrowError('REGISTER_AUTH_ENTITY.NOT_CONTAIN_EMAIL');
    expect(() => new RegisterAuth(payload2)).toThrowError('REGISTER_AUTH_ENTITY.NOT_CONTAIN_PASSWORD');
    expect(() => new RegisterAuth(payload3)).toThrowError('REGISTER_AUTH_ENTITY.NOT_CONTAIN_EMAIL');
  });

  it('should throw error when data type did not meet data type specification', () => {
    const payload1 = { email: true, password: 'qwertyuiop' };
    const payload2 = { email: 'johndoe@gmail.com', password: 11 };
    const payload3 = { email: 'NotAValidEmail', password: 'SuperSecretPassword' };
    const payload4 = { email: 'johndoe@gmail.com', password: '1234567' };

    expect(() => new RegisterAuth(payload1)).toThrowError('REGISTER_AUTH_ENTITY.EMAIL_SHOULD_BE_A_STRING');
    expect(() => new RegisterAuth(payload2)).toThrowError('REGISTER_AUTH_ENTITY.PASSWORD_SHOULD_BE_A_STRING');
    expect(() => new RegisterAuth(payload3)).toThrowError('REGISTER_AUTH_ENTITY.EMAIL_IS_NOT_VALID');
    expect(() => new RegisterAuth(payload4)).toThrowError('REGISTER_AUTH_ENTITY.PASSWORD_SHOULD_CONTAIN_AT_LEAST_8_CHARACTERS');
  });

  it('should create register auth object correctly', () => {
    // Arrange
    const payload = {
      email: 'johndoe@gmail.com',
      password: 'SuperSecretPassword',
    };

    // Action
    const registerAuth = new RegisterAuth(payload);

    // Assert
    expect(registerAuth.email).toEqual(payload.email);
    expect(registerAuth.password).toEqual(payload.password);
  });
});
