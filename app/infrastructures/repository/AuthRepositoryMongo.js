const AuthRepository = require('../../domains/repository/auth/AuthRepository');

class AuthRepositoryMongo extends AuthRepository {
  constructor(Auth) {
    super();
    this._Auth = Auth;
  }

  async addAuth(payload) {
    const auth = await new this._Auth(payload);
    await auth.save();
  }
}

module.exports = AuthRepositoryMongo;
