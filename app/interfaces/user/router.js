const express = require('express');

const { postUser } = require('./handler');

const router = express.Router();

router.post('/', postUser);

module.exports = router;
