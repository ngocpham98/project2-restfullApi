const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { setPush, getPush } = require('../controllers/push');
const router = express.Router();

router.post('/get_push_settings', validateToken, getPush);

router.post('/set_push_settings', validateToken, setPush);

module.exports = router;
