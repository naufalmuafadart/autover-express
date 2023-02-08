const express = require('express');

const router = express.Router();

const { postAuth, putAuth } = require('./handler');

router.post('/', postAuth);
router.put('/', putAuth);

module.exports = router;
