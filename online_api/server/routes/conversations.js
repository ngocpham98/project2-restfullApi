const express = require('express');
const { validateToken } = require('../middlewares/auth');
const {
  getListConversation,
  getConversation,
  deleteConversation,
  deleteMessage,
  setReadMessage,
} = require('../controllers/conversations');
const router = express.Router();

router.post('/get_list_conversation', validateToken, getListConversation);

router.post('/get_conversation_detail', validateToken, getConversation);

router.delete('/delete_conversation', validateToken, deleteConversation);

router.delete('/delete_message', validateToken, deleteMessage);

router.put('/set_read_message', validateToken, setReadMessage);

module.exports = router;
