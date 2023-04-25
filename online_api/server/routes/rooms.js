const express = require('express');
const { validateToken, authorize } = require('../middlewares/auth');
const {
  getListRooms,
  getRoom,
  addRoom,
  editRoom,
  deleteRoom,
} = require('../controllers/rooms');
const router = express.Router();

router.post('/get_list_rooms', validateToken, getListRooms);

router.post('/get_room', validateToken, getRoom);

router.post('/add_room', validateToken, authorize, addRoom);

router.post('/edit_room', validateToken, editRoom);

router.post('/delete_room', validateToken, deleteRoom);

module.exports = router;
