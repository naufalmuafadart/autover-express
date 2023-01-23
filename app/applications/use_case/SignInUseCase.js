class SignInUseCase {
  constructor({
    authValidator, userRepository, authRepository, bcryptHash, jwtTokenManager,
  }) {
    this._authValidator = authValidator;
    this._userRepository = userRepository;
    this._authRepository = authRepository;
    this._bcryptHash = bcryptHash;
    this._JWTTokenManager = jwtTokenManager;
  }

  async execute(payload) {
    try {
      const { email, password } = payload;
      await this._authValidator.validateSignInPayload({ email, password });
      await this._userRepository.validateEmailExist(email);
      const user = await this._userRepository.getUserByEmail(email);
      this._bcryptHash.validatePassword(password, user.password);
      const accessToken = await this._JWTTokenManager.createAccessToken({ id: user._id });
      const refreshToken = await this._JWTTokenManager.createRefreshToken({ id: user._id });
      await this._authRepository.addAuth({ refresh_token: refreshToken });
      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SignInUseCase;
