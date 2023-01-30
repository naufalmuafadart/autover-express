// use case
const CreateHostUseCase = require('../../applications/use_case/CreateHostUseCase');

// repository
const HostRepository = require('../../infrastructures/repository/HostRepository');

const hostRepository = new HostRepository();

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  createHost: async (req, res) => {
    const { user_id, district } = req.body;

    try {
      const createHostUseCase = new CreateHostUseCase({ hostRepository });
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
