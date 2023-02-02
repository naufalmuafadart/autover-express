const express = require('express');
const {
  index, readDistrict, createDistrict, updateDistrict,
} = require('./handler');

const router = express.Router();

router.get('/', index);
router.get('/district', readDistrict);
router.get('/district/add', createDistrict);
router.get('/district/edit/:id', updateDistrict);

module.exports = router;
