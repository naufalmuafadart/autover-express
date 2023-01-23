class SignUpUseCase {
  constructor({ authValidator, userRepository, bcryptHash }) {
    this._authValidator = authValidator;
    this._userRepository = userRepository;
    this._bcryptHash = bcryptHash;
  }

  async execute(payload) {
    try {
      const { full_name, phone_number, email, password } = payload;
      await this._authValidator.validateSignUpPayload( { full_name, phone_number, email, password });
      await this._userRepository.validateEmailDoesNotExist(email);
      await this._userRepository.validatePhoneNumberDoesNotExist(phone_number);
      const hashedPassword = await this._bcryptHash.hashString(password);
      await this._userRepository.addUser({ full_name, phone_number, email, password: hashedPassword });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SignUpUseCase;
