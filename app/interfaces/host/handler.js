const container = require('../../infrastructures/container');

// use case
const CreateHostUseCase = require('../../applications/use_case/CreateHostUseCase');
const ReadCheckIsHostUseCase = require('../../applications/use_case/ReadCheckIsHostUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  postHost: async (req, res) => {
    try {
      const createHostUseCase = container.getInstance(CreateHostUseCase.name);
      await createHostUseCase.execute(req.body);

      return res.status(201).json({
        status: 'success',
        message: 'Success register host',
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
  getCheckIsUserAHost: async (req, res) => {
    try {
      const readCheckIsHostUseCase = container.getInstance(ReadCheckIsHostUseCase.name);
      const isAHost = await readCheckIsHostUseCase.execute(req.params);

      return res.status(201).json({
        status: 'success',
        message: 'Success check user is a host',
        data: isAHost,
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
};
