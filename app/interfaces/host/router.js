const express = require('express');

const router = express.Router();

const { postHost, getCheckIsUserAHost } = require('./handler');

router.post('/', postHost);
router.get('/check/:id', getCheckIsUserAHost);

module.exports = router;
