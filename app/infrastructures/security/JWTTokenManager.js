require('dotenv').config();
const AuthenticationTokenManager = require('../../applications/security/AuthenticationTokenManager');

class JWTTokenManager extends AuthenticationTokenManager {
  constructor(JWT) {
    super();
    this._JWT = JWT;
  }

  async createAccessToken(payload) {
    return this._JWT.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: 15 });
  }

  async createRefreshToken(payload) {
    return this._JWT.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '60d' });
  }
}

module.exports = JWTTokenManager;
