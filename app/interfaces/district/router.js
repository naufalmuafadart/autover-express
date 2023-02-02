const express = require('express');

const { getDistricts, postDistrict, putDistrict } = require('./handler');

const router = express.Router();

router.get('/', getDistricts);
router.post('/', postDistrict);
router.put('/:id', putDistrict);

module.exports = router;
