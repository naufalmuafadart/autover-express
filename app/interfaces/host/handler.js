const container = require('../../infrastructures/container');

// use case
const CreateHostUseCase = require('../../applications/use_case/CreateHostUseCase');
const GetCheckIsHostPayload = require('../../applications/use_case/GetCheckIsHostUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  createHost: async (req, res) => {
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
  checkIsUserAHost: async (req, res) => {
    try {
      const getCheckIsHostPayload = container.getInstance(GetCheckIsHostPayload.name);
      const isAHost = await getCheckIsHostPayload.execute(req.params);

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
