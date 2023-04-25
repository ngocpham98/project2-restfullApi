const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { getScore, getScoreDetail } = require('../controllers/scores');
const router = express.Router();

router.post('/get_score', validateToken, getScore);

router.post('/get_score_detail', validateToken, getScoreDetail);

module.exports = router;
