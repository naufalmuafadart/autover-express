const express = require('express');

const router = express.Router();

const { createHost } = require('./handler');

router.post('/', createHost);

module.exports = router;
