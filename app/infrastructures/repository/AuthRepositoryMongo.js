const AuthRepository = require('../../domains/repository/auth/AuthRepository');
const NotFoundError = require('../../commons/exceptions/NotFoundError');

class AuthRepositoryMongo extends AuthRepository {
  constructor(Auth) {
    super();
    this._Auth = Auth;
  }

  async addAuth(payload) {
    const auth = await new this._Auth(payload);
    await auth.save();
  }

  async validateRefreshTokenExist(refreshToken) {
    const count = await this._Auth.find({ refresh_token: refreshToken });
    if (count.length === 0) throw new NotFoundError('Refresh token not found');
  }
}

module.exports = AuthRepositoryMongo;
