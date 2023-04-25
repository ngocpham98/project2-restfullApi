const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { search } = require('../controllers/search');
const router = express.Router();

router.post('/', validateToken, search);

module.exports = router;
