const RegisterUser = require('../../domains/repository/user/entities/RegisterUser');

class CreateUserUseCase {
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(payload) {
    try {
      const registerUser = new RegisterUser(payload);
      await this._userRepository.validateEmailDoesNotExist(registerUser.email);
      await this._userRepository.validatePhoneNumberDoesNotExist(registerUser.phone_number);
      const hashedPassword = await this._passwordHash.hashString(registerUser.password);
      await this._userRepository.addUser({
        full_name: registerUser.full_name,
        phone_number: registerUser.phone_number,
        email: registerUser.email,
        password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CreateUserUseCase;
