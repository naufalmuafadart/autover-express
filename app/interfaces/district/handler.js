const container = require('../../infrastructures/container');

// use case
const EditDistrictUseCase = require('../../applications/use_case/EditDistrictUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  put: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const editDistrictUseCase = container.getInstance(EditDistrictUseCase.name);
      await editDistrictUseCase.execute(id, name);
      return res.status(200).json({
        status: 'success',
        message: 'Success edit district',
      });
    } catch (e) {
      return common_functions.handlerErrorHandler(res, e);
    }
  },
};
