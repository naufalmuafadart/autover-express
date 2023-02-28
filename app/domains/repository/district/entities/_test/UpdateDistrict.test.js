const UpdateDistrict = require('../UpdateDistrict');

describe('An Update District entity', () => {
  it('should throw error when params did not contain required property', () => {
    const payload = { name: 'Bandung' };
    const params1 = {};
    const params2 = { id: null };
    const params3 = { id: undefined };

    expect(() => new UpdateDistrict(params1, payload)).toThrowError('UPDATE_DISTRICT_ENTITY.ID_NOT_FOUND');
    expect(() => new UpdateDistrict(params2, payload)).toThrowError('UPDATE_DISTRICT_ENTITY.ID_NOT_FOUND');
    expect(() => new UpdateDistrict(params3, payload)).toThrowError('UPDATE_DISTRICT_ENTITY.ID_NOT_FOUND');
  });

  it('should throw error when payload did not contain required property', () => {
    const params = { id: 'fakeId' };
    const payload1 = {};
    const payload2 = { name: null };
    const payload3 = { name: undefined };

    expect(() => new UpdateDistrict(params, payload1)).toThrowError('UPDATE_DISTRICT_ENTITY.NAME_NOT_FOUND');
    expect(() => new UpdateDistrict(params, payload2)).toThrowError('UPDATE_DISTRICT_ENTITY.NAME_NOT_FOUND');
    expect(() => new UpdateDistrict(params, payload3)).toThrowError('UPDATE_DISTRICT_ENTITY.NAME_NOT_FOUND');
  });

  it('should throw error when params did not meet data type specification', () => {
    const payload = { name: 'Bandung' };
    const params1 = { id: 9 };
    const params2 = { id: false };
    const params3 = { id: [] };

    expect(() => new UpdateDistrict(params1, payload)).toThrowError('UPDATE_DISTRICT_ENTITY.ID_SHOULD_BE_A_STRING');
    expect(() => new UpdateDistrict(params2, payload)).toThrowError('UPDATE_DISTRICT_ENTITY.ID_SHOULD_BE_A_STRING');
    expect(() => new UpdateDistrict(params3, payload)).toThrowError('UPDATE_DISTRICT_ENTITY.ID_SHOULD_BE_A_STRING');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const params = { id: 'fakeId' };
    const payload1 = { name: true };
    const payload2 = { name: 54 };
    const payload3 = { name: {} };

    expect(() => new UpdateDistrict(params, payload1)).toThrowError('UPDATE_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
    expect(() => new UpdateDistrict(params, payload2)).toThrowError('UPDATE_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
    expect(() => new UpdateDistrict(params, payload3)).toThrowError('UPDATE_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
  });

  it('should create Update District object correctly', () => {
    // Arrange
    const params = { id: 'fakeId' };
    const payload = { name: 'Astana' };

    // Action
    const updateDistrict = new UpdateDistrict(params, payload);

    // Assert
    expect(updateDistrict.id).toEqual(params.id);
    expect(updateDistrict.name).toEqual(payload.name);
  });
});
