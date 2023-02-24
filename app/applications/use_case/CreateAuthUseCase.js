const RegisterAuth = require('../../domains/repository/auth/entities/RegisterAuth');

class CreateAuthUseCase {
  constructor({
    userRepository,
    authRepository,
    passwordHash,
    authenticationTokenManager,
  }) {
    this._userRepository = userRepository;
    this._authRepository = authRepository;
    this._passwordHash = passwordHash;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    try {
      const registerAuth = new RegisterAuth({ ...payload });
      await this._userRepository.validateEmailExist(registerAuth.email);
      const registeredUser = await this._userRepository.getUserByEmail(registerAuth.email);
      this._passwordHash.validatePassword(registerAuth.password, registeredUser.password);

      const tokenPayload = { id: registeredUser._id };

      const accessToken = await this._authenticationTokenManager.createAccessToken(tokenPayload);
      const refreshToken = await this._authenticationTokenManager.createRefreshToken(tokenPayload);
      await this._authRepository.addAuth({ refresh_token: refreshToken });
      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CreateAuthUseCase;
