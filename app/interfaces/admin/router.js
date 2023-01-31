const express = require('express');
const { index, getDistrict, addDistrict } = require('./handler');

const router = express.Router();

router.get('/', index);
router.get('/district', getDistrict);
router.get('/district/add', addDistrict);

module.exports = router;
