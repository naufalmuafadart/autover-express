const express = require('express');
const {
  index, getDistrict, addDistrict, postDistrict,
} = require('./handler');

const router = express.Router();

router.get('/', index);
router.get('/district', getDistrict);
router.get('/district/add', addDistrict);
router.post('/district', postDistrict);

module.exports = router;
