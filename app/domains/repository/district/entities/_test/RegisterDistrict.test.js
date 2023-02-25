const RegisterDistrict = require('../RegisterDistrict');

describe('A Register district entity', () => {
  it('should throw error when payload did not contain required field', () => {
    const payload1 = {};
    const payload2 = { name: null };
    const payload3 = { name: undefined };

    expect(() => new RegisterDistrict(payload1)).toThrowError('REGISTER_DISTRICT_ENTITY.NAME_NOT_FOUND');
    expect(() => new RegisterDistrict(payload2)).toThrowError('REGISTER_DISTRICT_ENTITY.NAME_NOT_FOUND');
    expect(() => new RegisterDistrict(payload3)).toThrowError('REGISTER_DISTRICT_ENTITY.NAME_NOT_FOUND');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload1 = { name: {} };
    const payload2 = { name: false };

    expect(() => new RegisterDistrict(payload1)).toThrowError('REGISTER_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
    expect(() => new RegisterDistrict(payload2)).toThrowError('REGISTER_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
  });

  it('should create correct Register District payload', () => {
    // Arrange
    const payload = { name: 'North Bandung' };

    // Action
    const registerDistrict = new RegisterDistrict(payload);

    // Assert
    expect(registerDistrict.name).toEqual(payload.name);
  });
});
