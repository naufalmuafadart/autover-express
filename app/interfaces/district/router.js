const express = require('express');

const { readDistricts, postDistrict, putDistrict } = require('./handler');

const router = express.Router();

router.get('/', readDistricts);
router.post('/', postDistrict);
router.put('/:id', putDistrict);

module.exports = router;
