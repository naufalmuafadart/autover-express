const express = require('express');

const router = express.Router();

const { getAuth } = require('./handler');

router.get('/', getAuth);

module.exports = router;
