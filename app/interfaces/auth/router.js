const express = require('express');

const router = express.Router();

const { postAuth } = require('./handler');

router.post('/', postAuth);

module.exports = router;
