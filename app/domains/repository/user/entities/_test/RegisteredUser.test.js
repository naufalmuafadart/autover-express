const RegisteredUser = require('../RegisteredUser');

describe('A Registered User entity', () => {
  it('should throw error when payload did not contain required property', () => {
    const payload1 = {
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload2 = {
      _id: {},
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload3 = {
      _id: {},
      full_name: 'John Doe',
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload4 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload5 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload6 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
    };

    expect(() => new RegisteredUser(payload1)).toThrowError('REGISTERED_USER_ENTITY.NOT_CONTAIN_ID');
    expect(() => new RegisteredUser(payload2)).toThrowError('REGISTERED_USER_ENTITY.NOT_CONTAIN_FULL_NAME');
    expect(() => new RegisteredUser(payload3)).toThrowError('REGISTERED_USER_ENTITY.NOT_CONTAIN_PHONE_NUMBER_COUNTRY_CODE');
    expect(() => new RegisteredUser(payload4)).toThrowError('REGISTERED_USER_ENTITY.NOT_CONTAIN_PHONE_NUMBER');
    expect(() => new RegisteredUser(payload5)).toThrowError('REGISTERED_USER_ENTITY.NOT_CONTAIN_EMAIL');
    expect(() => new RegisteredUser(payload6)).toThrowError('REGISTERED_USER_ENTITY.NOT_CONTAIN_PASSWORD');
  });

  it('should throw error when data type did not meet data type specification', () => {
    const payload1 = {
      _id: true,
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload2 = {
      _id: {},
      full_name: true,
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload3 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: false,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload4 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: [],
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload5 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: true,
      password: 'XUkL5dr97F66OPgfXf8',
    };

    const payload6 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: true,
    };

    const payload7 = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'InvalidEmail',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    expect(() => new RegisteredUser(payload1)).toThrowError('REGISTERED_USER_ENTITY.ID_SHOULD_BE_AN_OBJECT');
    expect(() => new RegisteredUser(payload2)).toThrowError('REGISTERED_USER_ENTITY.FULL_NAME_SHOULD_BE_A_STRING');
    expect(() => new RegisteredUser(payload3)).toThrowError('REGISTERED_USER_ENTITY.PHONE_NUMBER_COUNTRY_CODE_SHOULD_BE_A_NUMBER');
    expect(() => new RegisteredUser(payload4)).toThrowError('REGISTERED_USER_ENTITY.PHONE_NUMBER_SHOULD_BE_A_STRING');
    expect(() => new RegisteredUser(payload5)).toThrowError('REGISTERED_USER_ENTITY.EMAIL_SHOULD_BE_A_STRING');
    expect(() => new RegisteredUser(payload6)).toThrowError('REGISTERED_USER_ENTITY.PASSWORD_SHOULD_BE_A_STRING');
    expect(() => new RegisteredUser(payload7)).toThrowError('REGISTERED_USER_ENTITY.EMAIL_IS_NOT_VALID');
  });

  it('should create registered user correctly', () => {
    // Arrange
    const payload = {
      _id: {},
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'XUkL5dr97F66OPgfXf8',
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser._id).toEqual(payload._id);
    expect(registeredUser.full_name).toEqual(payload.full_name);
    expect(registeredUser.phone_number_country_code).toEqual(payload.phone_number_country_code);
    expect(registeredUser.phone_number).toEqual(payload.phone_number);
    expect(registeredUser.email).toEqual(payload.email);
    expect(registeredUser.password).toEqual(payload.password);
  });
});
