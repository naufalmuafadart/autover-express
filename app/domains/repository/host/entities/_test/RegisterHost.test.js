const RegisterHost = require('../RegisterHost');

describe('A Register Host entity', () => {
  it('should throw error when payload did not contain required field', () => {
    const payload1 = {};
    const payload2 = { district_id: null };
    const payload3 = { district_id: undefined };

    expect(() => new RegisterHost(payload1)).toThrowError('REGISTER_HOST_ENTITY.DISTRICT_ID_NOT_FOUND');
    expect(() => new RegisterHost(payload2)).toThrowError('REGISTER_HOST_ENTITY.DISTRICT_ID_NOT_FOUND');
    expect(() => new RegisterHost(payload3)).toThrowError('REGISTER_HOST_ENTITY.DISTRICT_ID_NOT_FOUND');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload1 = { district_id: true };
    const payload2 = { district_id: false };
    const payload3 = { district_id: {} };

    expect(() => new RegisterHost(payload1)).toThrowError('REGISTER_HOST_ENTITY.DISTRICT_ID_SHOULD_BE_A_STRING');
    expect(() => new RegisterHost(payload2)).toThrowError('REGISTER_HOST_ENTITY.DISTRICT_ID_SHOULD_BE_A_STRING');
    expect(() => new RegisterHost(payload3)).toThrowError('REGISTER_HOST_ENTITY.DISTRICT_ID_SHOULD_BE_A_STRING');
  });

  it('should create correct register host object', () => {
    // Arrange
    const payload = { district_id: 'fakeId' };

    // Action
    const registerHost = new RegisterHost(payload);

    // Assert
    expect(registerHost.district_id).toEqual(payload.district_id);
  });
});
