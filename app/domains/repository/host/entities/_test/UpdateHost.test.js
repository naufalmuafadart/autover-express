const UpdateHost = require('../UpdateHost');

describe('A Update Host entity', () => {
  it('should throw error when payload not contain required property', () => {
    // Arrange
    const full_name = 'John Doe';
    const district_id = 'abc123';
    const phone_number = '81212341234';
    const payload1 = {
      district_id,
      phone_number,
    };
    const payload2 = {
      full_name,
      phone_number,
    };
    const payload3 = {
      full_name,
      district_id,
    };

    // Action and Assert
    expect(() => new UpdateHost(payload1)).toThrowError('UPDATE_HOST_ENTITY.FULL_NAME_NOT_FOUND');
    expect(() => new UpdateHost(payload2)).toThrowError('UPDATE_HOST_ENTITY.DISTRICT_ID_NOT_FOUND');
    expect(() => new UpdateHost(payload3)).toThrowError('UPDATE_HOST_ENTITY.PHONE_NUMBER_NOT_FOUND');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const full_name = 'John Doe';
    const district_id = 'abc123';
    const phone_number = '81212341234';
    const payload1 = {
      full_name: false,
      district_id,
      phone_number,
    };
    const payload2 = {
      full_name,
      district_id: 2,
      phone_number,
    };
    const payload3 = {
      full_name,
      district_id,
      phone_number: [],
    };

    // Action and Assert
    expect(() => new UpdateHost(payload1)).toThrowError('UPDATE_HOST_ENTITY.FULL_NAME_SHOULD_BE_A_STRING');
    expect(() => new UpdateHost(payload2)).toThrowError('UPDATE_HOST_ENTITY.DISTRICT_ID_SHOULD_BE_A_STRING');
    expect(() => new UpdateHost(payload3)).toThrowError('UPDATE_HOST_ENTITY.PHONE_NUMBER_SHOULD_BE_A_STRING');
  });

  it('should create update host object correctly', () => {
    // Arrange
    const payload = {
      full_name: 'John Doe',
      district_id: 'abc123',
      phone_number: '81212341234',
    };

    // Action
    const updateHost = new UpdateHost(payload);

    // Assert
    expect(updateHost.full_name).toEqual(payload.full_name);
    expect(updateHost.district_id).toEqual(payload.district_id);
    expect(updateHost.phone_number).toEqual(payload.phone_number);
  });
});
