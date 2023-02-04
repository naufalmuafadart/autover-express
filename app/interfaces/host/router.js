const express = require('express');

const router = express.Router();

const { postHost, getCheckIsUserAHost, putHost } = require('./handler');

router.post('/', postHost);
router.put('/', putHost);
router.get('/check', getCheckIsUserAHost);

module.exports = router;
