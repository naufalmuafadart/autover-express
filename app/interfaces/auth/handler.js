const container = require('../../infrastructures/container');

// use case
const SignUpUseCase = require('../../applications/use_case/SignUpUseCase');
const SignInUseCase = require('../../applications/use_case/SignInUseCase');

// validator
const authValidator = require('../../infrastructures/validator/auth/validator');

// repository
const UserRepository = require('../../domains/user/UserRepository');
const AuthRepository = require('../../domains/auth/AuthRepository');

// tools
const PasswordHash = require('../../applications/security/PasswordHash');
const AuthenticationTokenManager = require('../../applications/security/AuthenticationTokenManager');
const common_functions = require('../../commons/common_functions');

module.exports = {
  signUp: async (req, res) => {
    const {
      full_name, phone_number, email, password,
    } = req.body;

    try {
      const signUpUseCase = new SignUpUseCase(
        {
          authValidator,
          userRepository: container.getInstance(UserRepository.name),
          bcryptHash: container.getInstance(PasswordHash.name),
        },
      );
      const data = await signUpUseCase.execute({
        full_name, phone_number, email, password,
      });

      return res.status(201).json({
        status: 'success',
        message: 'Success register user',
        data,
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      const signInUseCase = new SignInUseCase(
        {
          authValidator,
          userRepository: container.getInstance(UserRepository.name),
          authRepository: container.getInstance(AuthRepository.name),
          bcryptHash: container.getInstance(PasswordHash.name),
          jwtTokenManager: container.getInstance(AuthenticationTokenManager.name),
        },
      );
      const data = await signInUseCase.execute({ email, password });

      return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data,
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
};
