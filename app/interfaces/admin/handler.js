module.exports = {
  index: (req, res) => res.render('index'),
  getDistrict: (req, res) => res.render('./district/index'),
  addDistrict: (req, res) => res.render('./district/create'),
};
