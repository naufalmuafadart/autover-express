const container = require('../../infrastructures/container');

const CreateDistrictUseCase = require('../../applications/use_case/CreateDistrictUseCase');
const ViewDistrictUseCase = require('../../applications/use_case/ViewDistrictUseCase');
const common_functions = require('../../commons/common_functions');

module.exports = {
  index: (req, res) => res.render('index'),
  getDistrict: async (req, res) => {
    try {
      const viewDistrictUseCase = container.getInstance(ViewDistrictUseCase.name);
      const districts = await viewDistrictUseCase.execute();
      return res.render('./district/index', { districts });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
  addDistrict: (req, res) => res.render('./district/create'),
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
};
