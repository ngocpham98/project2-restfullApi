const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { getComments, setComment } = require('../controllers/comments');
const router = express.Router();

router.post('/get_comments', validateToken, getComments);

router.post('/set_comment', validateToken, setComment);

module.exports = router;
