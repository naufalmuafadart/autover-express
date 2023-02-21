const RegisterAuth = require('../../domains/repository/auth/entities/RegisterAuth');
const RegisteredUser = require('../../domains/repository/user/entities/RegisteredUser');

class CreateAuthUseCase {
  constructor({
    // authValidator,
    userRepository,
    authRepository,
    passwordHash,
    authenticationTokenManager,
  }) {
    // this._authValidator = authValidator;
    this._userRepository = userRepository;
    this._authRepository = authRepository;
    this._passwordHash = passwordHash;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    try {
      const registerAuth = new RegisterAuth({ ...payload });
      await this._userRepository.validateEmailExist(registerAuth.email);
      const registeredUserPayload = await this._userRepository.getUserByEmail(registerAuth.email);
      const registeredUser = new RegisteredUser(registeredUserPayload);
      this._passwordHash.validatePassword(registerAuth.password, registeredUserPayload.password);

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
