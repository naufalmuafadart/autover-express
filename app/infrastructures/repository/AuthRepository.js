const Auth = require('../../domains/model/Auth');

class AuthRepository {
  async addAuth(payload) {
    const auth = await new Auth(payload);
    await auth.save();
  }
}

module.exports = AuthRepository;
