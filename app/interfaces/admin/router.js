const express = require('express');
const {
  index, getDistrict, addDistrict, postDistrict, editDistrict,
} = require('./handler');

const router = express.Router();

router.get('/', index);
router.get('/district', getDistrict);
router.get('/district/add', addDistrict);
router.post('/district', postDistrict);
router.get('/district/edit/:id', editDistrict);

module.exports = router;
