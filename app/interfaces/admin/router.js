const express = require('express');
const { index, getDistrict } = require('./handler');

const router = express.Router();

router.get('/', index);
router.get('/district', getDistrict);

module.exports = router;
