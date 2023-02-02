const container = require('../../infrastructures/container');

// use case
const CreateDistrictUseCase = require('../../applications/use_case/CreateDistrictUseCase');
const ReadDistrictsUseCase = require('../../applications/use_case/ReadDistrictsUseCase');
const UpdateDistrictUseCase = require('../../applications/use_case/UpdateDistrictUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  getDistricts: async (req, res) => {
    try {
      const getDistrictsUseCase = container.getInstance(ReadDistrictsUseCase.name);
      const districts = await getDistrictsUseCase.execute();
      return res.status(200).json({
        status: 'success',
        message: 'Success get districts',
        data: districts,
      });
    } catch (e) {
      return common_functions.handlerErrorHandler(res, e);
    }
  },
  postDistrict: async (req, res) => {
    try {
      const { name } = req.body;

      const createDistrictUeCase = container.getInstance(CreateDistrictUseCase.name);
      await createDistrictUeCase.execute(name);

      return res.status(201).json({
        status: 'success',
        message: 'success add district',
      });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
  putDistrict: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const editDistrictUseCase = container.getInstance(UpdateDistrictUseCase.name);
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
