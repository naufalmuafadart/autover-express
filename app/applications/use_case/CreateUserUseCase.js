class CreateUserUseCase {
  constructor({ userRepository, userValidator, passwordHash }) {
    this._userRepository = userRepository;
    this._userValidator = userValidator;
    this._passwordHash = passwordHash;
  }

  async execute(payload) {
    try {
      await this._userValidator.validateCreateUserPayload(payload);
      const {
        phone_number, email, password,
      } = payload;
      await this._userRepository.validateEmailDoesNotExist(email);
      await this._userRepository.validatePhoneNumberDoesNotExist(phone_number);
      const hashedPassword = await this._passwordHash.hashString(password);
      await this._userRepository.addUser({ ...payload, password: hashedPassword });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CreateUserUseCase;
