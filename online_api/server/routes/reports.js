const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { createReport } = require('../controllers/reports');
const router = express.Router();

router.post('/report', validateToken, createReport);

module.exports = router;
