const container = require('../../infrastructures/container');

// use case
const CreateHostUseCase = require('../../applications/use_case/CreateHostUseCase');
const ReadCheckIsHostUseCase = require('../../applications/use_case/ReadCheckIsHostUseCase');
const UpdateHostUseCase = require('../../applications/use_case/UpdateHostUseCase');

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
  putHost: async (req, res) => {
    try {
      const updateHostUseCase = container.getInstance(UpdateHostUseCase.name);
      await updateHostUseCase.execute(req.body, req.get('Authorization'));
      return res.json({
        status: 'success',
        message: 'success update host',
      });
    } catch (error) {
      return common_functions.handlerErrorHandler(res, error);
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
