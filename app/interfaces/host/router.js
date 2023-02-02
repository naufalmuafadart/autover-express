const express = require('express');

const router = express.Router();

const { createHost, checkIsUserAHost } = require('./handler');

router.post('/', createHost);
router.get('/check/:id', checkIsUserAHost);

module.exports = router;
