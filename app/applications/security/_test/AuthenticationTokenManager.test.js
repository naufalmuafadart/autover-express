const AuthenticationTokenManager = require('../AuthenticationTokenManager');

describe('An Authentication Token Manager interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const authenticationTokenManager = new AuthenticationTokenManager();

    await expect(authenticationTokenManager.createAccessToken({})).rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.createRefreshToken({})).rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => authenticationTokenManager.verifyAccessToken('')).toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => authenticationTokenManager.verifyRefreshToken('')).toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(() => authenticationTokenManager.getTokenFromAuthorizationHeader('')).toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
