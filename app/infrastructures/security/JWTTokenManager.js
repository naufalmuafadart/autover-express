require('dotenv').config();
const AuthenticationTokenManager = require('../../applications/security/AuthenticationTokenManager');
const AuthorizationError = require('../../commons/exceptions/AuthorizationError');
const JWTPayload = require('../../domains/repository/jwt/entities/JWTPayload');

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

  verifyStringNotUndefined(token) {
    if (typeof token === 'undefined' || token === null) {
      throw new AuthorizationError('Token is required');
    }
  }

  verifyAccessToken(token) {
    try {
      this.verifyStringNotUndefined(token);
      const key = process.env.ACCESS_TOKEN_KEY;
      const payload = this._JWT.verify(token, key);
      return new JWTPayload(payload);
    } catch (error) {
      throw new AuthorizationError(error.message);
    }
  }

  verifyRefreshToken(token) {
    try {
      this.verifyStringNotUndefined(token);
      const key = process.env.REFRESH_TOKEN_KEY;
      const payload = this._JWT.verify(token, key);
      return new JWTPayload(payload);
    } catch (error) {
      throw new AuthorizationError(error.message);
    }
  }

  getTokenFromAuthorizationHeader(header) {
    try {
      this.verifyStringNotUndefined(header);
      return header.substring(7, header.length);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = JWTTokenManager;
