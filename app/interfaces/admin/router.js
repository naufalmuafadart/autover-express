const express = require('express');
const {
  index, getDistrict, createDistrict, updateDistrict,
} = require('./handler');

const router = express.Router();

router.get('/', index);
router.get('/district', getDistrict);
router.get('/district/add', createDistrict);
router.get('/district/edit/:id', updateDistrict);

module.exports = router;
