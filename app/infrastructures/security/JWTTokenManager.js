require('dotenv').config();
const AuthenticationTokenManager = require('../../applications/security/AuthenticationTokenManager');

class JWTTokenManager extends AuthenticationTokenManager {
  constructor(JWT) {
    super();
    this._JWT = JWT;
  }

  async createAccessToken(payload) {
    const key = process.env.ACCESS_TOKEN_KEY;
    const age = process.env.ACCESS_TOKEN_AGE;
    return this._JWT.sign(payload, key, { expiresIn: age });
  }

  async createRefreshToken(payload) {
    const key = process.env.REFRESH_TOKEN_KEY;
    const age = process.env.REFRESH_TOKEN_AGE;
    return this._JWT.sign(payload, key, { expiresIn: age });
  }

  async verifyAccessToken(token) {
    try {
      const key = process.env.ACCESS_TOKEN_KEY;
      return this._JWT.verify(token, key);
    } catch (e) {
      throw e;
    }
  }

  getTokenFromAuthorizationHeader(AuthorizationHeader) {
    return AuthorizationHeader.substring(7, AuthorizationHeader.length);
  }
}

module.exports = JWTTokenManager;
