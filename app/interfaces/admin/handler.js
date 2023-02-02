const container = require('../../infrastructures/container');

const ViewDistrictUseCase = require('../../applications/use_case/ViewDistrictUseCase');
const ViewEditDistrictUseCase = require('../../applications/use_case/ViewEditDistrictUseCase');
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
  createDistrict: (req, res) => res.render('./district/create'),
  updateDistrict: async (req, res) => {
    const { id } = req.params;
    try {
      const viewEditDistrictUseCase = container.getInstance(ViewEditDistrictUseCase.name);
      const district = await viewEditDistrictUseCase.execute(id);
      return res.render('./district/edit', { district });
    } catch (err) {
      return common_functions.handlerErrorHandler(res, err);
    }
  },
};
