const container = require('../../infrastructures/container');

// use case
const CreateAuthUseCase = require('../../applications/use_case/CreateAuthUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  postAuth: async (req, res) => {
    const { email, password } = req.body;

    try {
      const createAuthUseCase = container.getInstance(CreateAuthUseCase.name);
      const data = await createAuthUseCase.execute({ email, password });

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
