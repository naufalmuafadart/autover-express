const express = require('express');

const router = express.Router();

const { createHost, getCheckIsUserAHost } = require('./handler');

router.post('/', createHost);
router.get('/check/:id', getCheckIsUserAHost);

module.exports = router;
