const container = require('../../infrastructures/container');

// use case
const CreateHostUseCase = require('../../applications/use_case/CreateHostUseCase');
const ReadCheckIsHostUseCase = require('../../applications/use_case/ReadCheckIsHostUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  postHost: async (req, res) => {
    try {
      const AuthorizationHeader = req.get('Authorization');
      const createHostUseCase = container.getInstance(CreateHostUseCase.name);
      await createHostUseCase.execute(req.body, AuthorizationHeader);

      return res.status(201).json({
        status: 'success',
        message: 'Success register host',
      });
    } catch (err) {
      console.log(err);
      return common_functions.handlerErrorHandler(res, err);
    }
  },
  getCheckIsUserAHost: async (req, res) => {
    try {
      const AuthorizationHeader = req.get('Authorization');
      const readCheckIsHostUseCase = container.getInstance(ReadCheckIsHostUseCase.name);
      const isAHost = await readCheckIsHostUseCase.execute(AuthorizationHeader);

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
