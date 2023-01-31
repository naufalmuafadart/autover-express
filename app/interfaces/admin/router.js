const express = require('express');
const { index } = require('./handler');

const router = express.Router();

router.get('/', index);

module.exports = router;
