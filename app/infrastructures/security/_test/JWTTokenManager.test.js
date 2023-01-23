const JWTTokenManager = require('../JWTTokenManager');
const {object, number} = require("joi");

describe('A JWT Token Manager class', () => {
  const jwtTokenManager = new JWTTokenManager();
  const payload = { id: 'the id' };

  describe('A createAccessToken class', () => {
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

  describe('A createRefreshToken class', () => {
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
});
