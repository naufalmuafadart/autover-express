const container = require('../../infrastructures/container');
const CreateUserUseCase = require('../../applications/use_case/CreateUserUseCase');
const common_functions = require('../../commons/common_functions');

module.exports = {
  postUser: async (req, res) => {
    const {
      full_name, phone_number, email, password,
    } = req.body;

    try {
      const signUpUseCase = container.getInstance(CreateUserUseCase.name);
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
};
