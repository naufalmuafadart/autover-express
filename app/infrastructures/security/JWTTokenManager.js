require('dotenv').config();

const JWT = require('jsonwebtoken');

class JWTTokenManager {
  async createAccessToken(payload) {
    return JWT.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: 15 });
  }

  async createRefreshToken(payload) {
    return JWT.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '60d' });
  }
}

module.exports = JWTTokenManager;
