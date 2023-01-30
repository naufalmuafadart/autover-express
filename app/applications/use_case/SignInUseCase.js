class SignInUseCase {
  constructor({
    authValidator, userRepository, authRepository, passwordHash, authenticationTokenManager,
  }) {
    this._authValidator = authValidator;
    this._userRepository = userRepository;
    this._authRepository = authRepository;
    this._passwordHash = passwordHash;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    try {
      const { email, password } = payload;
      await this._authValidator.validateSignInPayload({ email, password });
      await this._userRepository.validateEmailExist(email);
      const user = await this._userRepository.getUserByEmail(email);
      this._passwordHash.validatePassword(password, user.password);
      const accessToken = await this._authenticationTokenManager
        .createAccessToken({ id: user._id });
      const refreshToken = await this._authenticationTokenManager
        .createRefreshToken({ id: user._id });
      await this._authRepository.addAuth({ refresh_token: refreshToken });
      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SignInUseCase;
