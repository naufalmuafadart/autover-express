const container = require('../../infrastructures/container');

// use case
const SignUpUseCase = require('../../applications/use_case/SignUpUseCase');
const SignInUseCase = require('../../applications/use_case/SignInUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  signUp: async (req, res) => {
    const {
      full_name, phone_number, email, password,
    } = req.body;

    try {
      const signUpUseCase = container.getInstance(SignUpUseCase.name);
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
      const signInUseCase = container.getInstance(SignInUseCase.name);
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
