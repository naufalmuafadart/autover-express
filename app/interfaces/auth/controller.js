// use case
const SignUpUseCase = require('../../applications/use_case/SignUpUseCase');
const SignInUseCase = require('../../applications/use_case/SignInUseCase');

// validator
const authValidator = require('../../infrastructures/validator/auth/validator');

// repository
const UserRepository = require('../../infrastructures/repository/UserRepository');
const AuthRepository = require('../../infrastructures/repository/AuthRepository');
const userRepository = new UserRepository();
const authRepository = new AuthRepository();

// tools
const BcryptHash = require('../../infrastructures/security/BcryptHash');
const JWTTokenManager = require('../../infrastructures/security/JWTTokenManager');
const common_functions = require('../../commons/common_functions');
const bcryptHash = new BcryptHash();
const jwtTokenManager = new JWTTokenManager();

const ClientError = require("../../commons/exceptions/ClientError");

module.exports = {
  signUp: async (req, res) => {
    const { full_name, phone_number, email, password } = req.body;

    try {
      const signUpUseCase = new SignUpUseCase(
        { authValidator, userRepository, bcryptHash }
      );
      const data = await signUpUseCase.execute({ full_name, phone_number, email, password });

      return res.status(201).json({
        status: "success",
        message: 'Success register user',
        data,
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
  signIn : async (req, res) => {
    const { email, password } = req.body;

    try {
      const signInUseCase = new SignInUseCase(
        {
          authValidator,
          userRepository,
          authRepository,
          bcryptHash,
          jwtTokenManager
        }
      );
      const data = await signInUseCase.execute({ email, password });

      return res.status(200).json({
        status: "success",
        message: 'User logged in successfully',
        data,
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
};
