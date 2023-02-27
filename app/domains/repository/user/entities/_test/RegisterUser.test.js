const RegisterUser = require('../RegisterUser');

describe('A Register User entity', () => {
  it('should throw error when payload did not contain required field', () => {
    const full_name = 'John Doe';
    const phone_number = '81212341234';
    const email = 'johndoe@gmail.com';
    const password = 'SuperSecretPassword';

    const payload1 = {
      phone_number,
      email,
      password,
    };

    const payload2 = {
      full_name,
      email,
      password,
    };

    const payload3 = {
      full_name,
      phone_number,
      password,
    };

    const payload4 = {
      full_name,
      phone_number,
      email,
    };

    expect(() => new RegisterUser(payload1)).toThrowError('REGISTER_USER_ENTITY.NOT_CONTAIN_FULL_NAME');
    expect(() => new RegisterUser(payload2)).toThrowError('REGISTER_USER_ENTITY.NOT_CONTAIN_PHONE_NUMBER');
    expect(() => new RegisterUser(payload3)).toThrowError('REGISTER_USER_ENTITY.NOT_CONTAIN_EMAIL');
    expect(() => new RegisterUser(payload4)).toThrowError('REGISTER_USER_ENTITY.NOT_CONTAIN_PASSWORD');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const full_name = 'John Doe';
    const phone_number = '81212341234';
    const email = 'johndoe@gmail.com';
    const password = 'SuperSecretPassword';

    const payload1 = {
      full_name: true,
      phone_number,
      email,
      password,
    };

    const payload2 = {
      full_name,
      phone_number: {},
      email,
      password,
    };

    const payload3 = {
      full_name,
      phone_number,
      email: [],
      password,
    };

    const payload4 = {
      full_name,
      phone_number,
      email,
      password: 1,
    };

    expect(() => new RegisterUser(payload1)).toThrowError('REGISTER_USER_ENTITY.FULL_NAME_SHOULD_BE_A_STRING');
    expect(() => new RegisterUser(payload2)).toThrowError('REGISTER_USER_ENTITY.PHONE_NUMBER_SHOULD_BE_A_STRING');
    expect(() => new RegisterUser(payload3)).toThrowError('REGISTER_USER_ENTITY.EMAIL_SHOULD_BE_A_STRING');
    expect(() => new RegisterUser(payload4)).toThrowError('REGISTER_USER_ENTITY.PASSWORD_SHOULD_BE_A_STRING');
  });

  it('should create Register User entity correctly', () => {
    // Arrange
    const payload = {
      full_name: 'John Doe',
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'SuperSecretPassword',
    };

    // Action
    const registerUser = new RegisterUser(payload);

    // Assert
    expect(registerUser.full_name).toEqual(payload.full_name);
    expect(registerUser.phone_number).toEqual(payload.phone_number);
    expect(registerUser.email).toEqual(payload.email);
    expect(registerUser.password).toEqual(payload.password);
  });
});
