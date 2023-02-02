const express = require('express');

const { getDistricts, putDistrict } = require('./handler');

const router = express.Router();

router.get('/', getDistricts);
router.put('/:id', putDistrict);

module.exports = router;
