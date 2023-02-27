const UpdateAuth = require('../UpdateAuth');

describe('An Update Auth use case', () => {
  it('should throw error when payload did not contain required property', () => {
    // Arrange
    const payload1 = {};
    const payload2 = { refresh_token: null };
    const payload3 = { refresh_token: undefined };

    // Action and Assert
    expect(() => new UpdateAuth(payload1)).toThrowError('UPDATE_AUTH_ENTITY.NOT_CONTAIN_REFRESH_TOKEN');
    expect(() => new UpdateAuth(payload2)).toThrowError('UPDATE_AUTH_ENTITY.NOT_CONTAIN_REFRESH_TOKEN');
    expect(() => new UpdateAuth(payload3)).toThrowError('UPDATE_AUTH_ENTITY.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = { refresh_token: true };
    const payload2 = { refresh_token: [] };
    const payload3 = { refresh_token: 89 };

    // Action and Assert
    expect(() => new UpdateAuth(payload1)).toThrowError('UPDATE_AUTH_ENTITY.REFRESH_TOKEN_SHOULD_BE_A_STRING');
    expect(() => new UpdateAuth(payload2)).toThrowError('UPDATE_AUTH_ENTITY.REFRESH_TOKEN_SHOULD_BE_A_STRING');
    expect(() => new UpdateAuth(payload3)).toThrowError('UPDATE_AUTH_ENTITY.REFRESH_TOKEN_SHOULD_BE_A_STRING');
  });

  it('should create Update Auth entity correctly', () => {
    // Arrange
    const payload = { refresh_token: 'ey.payload.signature' };

    // Action
    const updateAuth = new UpdateAuth(payload);

    // Assert
    expect(updateAuth.refresh_token).toEqual(payload.refresh_token);
  });
});
