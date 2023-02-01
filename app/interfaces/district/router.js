const express = require('express');

const { put } = require('./handler');

const router = express.Router();

router.put('/:id', put);

module.exports = router;
