const container = require('../../infrastructures/container');

// use case
const CreateDistrictUseCase = require('../../applications/use_case/CreateDistrictUseCase');
const ReadDistrictsUseCase = require('../../applications/use_case/ReadDistrictsUseCase');
const UpdateDistrictUseCase = require('../../applications/use_case/UpdateDistrictUseCase');

// tools
const common_functions = require('../../commons/common_functions');

module.exports = {
  readDistricts: async (req, res) => {
    try {
      const readDistrictUseCase = container.getInstance(ReadDistrictsUseCase.name);
      const districts = await readDistrictUseCase.execute();
      return res.status(200).json({
        status: 'success',
        message: 'Success get districts',
        data: districts,
      });
    } catch (e) {
      console.log(e.message);
      return common_functions.handlerErrorHandler(res, e);
    }
  },
  postDistrict: async (req, res) => {
    try {
      const createDistrictUeCase = container.getInstance(CreateDistrictUseCase.name);
      await createDistrictUeCase.execute(req.body);

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
      const updateDistrictUseCase = container.getInstance(UpdateDistrictUseCase.name);
      await updateDistrictUseCase.execute(id, name);
      return res.status(200).json({
        status: 'success',
        message: 'Success edit district',
      });
    } catch (e) {
      return common_functions.handlerErrorHandler(res, e);
    }
  },
};
