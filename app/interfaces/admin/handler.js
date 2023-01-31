const container = require('../../infrastructures/container');

const CreateDistrictUseCase = require('../../applications/use_case/CreateDistrictUseCase');
const common_functions = require('../../commons/common_functions');

module.exports = {
  index: (req, res) => res.render('index'),
  getDistrict: (req, res) => res.render('./district/index'),
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
      console.log(err);
      return common_functions.handlerErrorHandler(res, err);
    }
  },
};
