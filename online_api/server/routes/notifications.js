const express = require('express');
const { validateToken } = require('../middlewares/auth');
const {
  getNotifications,
  setReadNoti,
} = require('../controllers/notifications');
const router = express.Router();

router.post('/get_notification', validateToken, getNotifications);

router.put('/set_read_notification', validateToken, setReadNoti);

module.exports = router;
