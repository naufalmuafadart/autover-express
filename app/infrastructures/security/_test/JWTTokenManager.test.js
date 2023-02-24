const jwt = require('jsonwebtoken');
const JWTTokenManager = require('../JWTTokenManager');
const JWTPayload = require('../../../domains/repository/jwt/entities/JWTPayload');
const AuthorizationError = require('../../../commons/exceptions/AuthorizationError');

describe('A JWT Token Manager class', () => {
  const jwtTokenManager = new JWTTokenManager(jwt);
  const payload = { id: '12334retr' };

  describe('A createAccessToken function', () => {
    it('should return correct access token', async () => {
      const accessToken = await jwtTokenManager.createAccessToken(payload);
      expect(typeof accessToken).toEqual('string');
      expect(accessToken).not.toEqual('');
      expect(accessToken).toContain('.');
      expect(accessToken.split('.').length - 1).toEqual(2);

      const splittedToken = accessToken.split('.');
      const tokenPayloadBase64 = splittedToken[1];
      const tokenPayloadString = Buffer.from(tokenPayloadBase64, 'base64').toString('ascii');
      const tokenPayload = JSON.parse(tokenPayloadString);

      expect(typeof tokenPayload).toBe('object');
      expect(tokenPayload).toHaveProperty('id');
      expect(tokenPayload).toHaveProperty('iat');
      expect(tokenPayload).toHaveProperty('exp');

      const { id } = tokenPayload;

      expect(typeof id).toBe('string');
      expect(id).not.toEqual('');
    });
  });

  describe('A createRefreshToken function', () => {
    it('should return correct refresh token', async () => {
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);
      expect(typeof refreshToken).toEqual('string');
      expect(refreshToken).not.toEqual('');
      expect(refreshToken).toContain('.');
      expect(refreshToken.split('.').length - 1).toEqual(2);

      const splittedToken = refreshToken.split('.');
      const tokenPayloadBase64 = splittedToken[1];
      const tokenPayloadString = Buffer.from(tokenPayloadBase64, 'base64').toString('ascii');
      const tokenPayload = JSON.parse(tokenPayloadString);

      expect(typeof tokenPayload).toBe('object');
      expect(tokenPayload).toHaveProperty('id');
      expect(tokenPayload).toHaveProperty('iat');
      expect(tokenPayload).toHaveProperty('exp');

      const { id } = tokenPayload;

      expect(typeof id).toBe('string');
      expect(id).not.toEqual('');
    });
  });

  describe('A verifyStringNotUndefined function', () => {
    it('should throw authorization error when undefined string or null string passed', () => {
      expect(() => jwtTokenManager.verifyStringNotUndefined(undefined)).toThrow(AuthorizationError);
      expect(() => jwtTokenManager.verifyStringNotUndefined(undefined)).toThrow('Token is required');
    });

    it('should not throw error when valid string passed', () => {
      expect(() => jwtTokenManager.verifyStringNotUndefined('string')).not.toThrow(AuthorizationError);
    });
  });

  describe('A verify access token function', () => {
    it('should not throw error when valid refresh token passed', async () => {
      const token = await jwtTokenManager.createAccessToken(payload);
      expect(() => jwtTokenManager.verifyAccessToken(token)).not.toThrow(Error);
    });

    it('should return valid payload when valid refresh token passed', async () => {
      // Arrange
      const token = await jwtTokenManager.createAccessToken(payload);

      // Action
      const payloadReturn = jwtTokenManager.verifyAccessToken(token);

      // Assert
      expect(payloadReturn instanceof JWTPayload).toEqual(true);
      expect(payloadReturn.id).toEqual(payload.id);
    });

    it('should throw error when invalid access token passed', () => {
      const token = 'invalid token';
      expect(() => jwtTokenManager.verifyAccessToken(token)).toThrow(AuthorizationError);
    });
  });

  describe('A verify refresh token function', () => {
    it('should not throw error when valid refresh token passed', async () => {
      const token = await jwtTokenManager.createRefreshToken(payload);
      expect(() => jwtTokenManager.verifyRefreshToken(token)).not.toThrow(Error);
    });

    it('should return valid payload when valid refresh token passed', async () => {
      const token = await jwtTokenManager.createRefreshToken(payload);
      const payloadReturn = jwtTokenManager.verifyRefreshToken(token);
      expect(typeof payloadReturn).toBe('object');
      expect(payloadReturn).toHaveProperty('id', payload.id);
    });

    it('should throw error when invalid refresh token passed', () => {
      const token = 'invalid token';
      expect(() => jwtTokenManager.verifyRefreshToken(token)).toThrow(AuthorizationError);
    });
  });

  describe('A getTokenFromAuthorizationHeader function', () => {
    it('should throw error when a null value or an undefined value passed', async () => {
      expect(() => jwtTokenManager.getTokenFromAuthorizationHeader(null))
        .toThrow(AuthorizationError);
      expect(() => jwtTokenManager.getTokenFromAuthorizationHeader(undefined))
        .toThrow(AuthorizationError);
    });

    it('should return token when header valid', async () => {
      const token = await jwtTokenManager.createAccessToken(payload);
      const headerValue = `Bearer ${token}`;
      const returnValue = jwtTokenManager.getTokenFromAuthorizationHeader(headerValue);
      expect(returnValue).toEqual(token);
    });
  });
});
