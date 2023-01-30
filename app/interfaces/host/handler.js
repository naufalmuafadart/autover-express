const container = require('../../infrastructures/container');

// use case
const CreateHostUseCase = require('../../applications/use_case/CreateHostUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  createHost: async (req, res) => {
    const { user_id, district } = req.body;

    try {
      const createHostUseCase = container.getInstance(CreateHostUseCase.name);
      await createHostUseCase.execute({ user_id, district });

      return res.status(201).json({
        status: 'success',
        message: 'Success register host',
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
};
