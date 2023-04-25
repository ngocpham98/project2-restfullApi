const express = require('express');
const { validateToken, authorize } = require('../middlewares/auth');
const {
  signUp,
  login,
  logout,
  changeInfor,
  getUserInfo,
  changePassword,
  setBlock,
  getListBlock,
} = require('../controllers/auth');
const router = express.Router();

router.post('/signup', signUp);

router.post('/login', login);

router.post('/logout', validateToken, logout);

router.put('/change_info_after_signup', validateToken, changeInfor);

router.post('/get_user_info', validateToken, getUserInfo);

router.put('/change_password', validateToken, changePassword);

router.put('/set_block', validateToken, authorize, setBlock);

router.post('/get_list_block', validateToken, authorize, getListBlock);

module.exports = router;
