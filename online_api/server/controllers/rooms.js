const { Rooms, Users } = require('../models');
const STATUS_CODE = require('../constants');

exports.getListRooms = async (req, res) => {
  try {
    const { index, count } = req.body;

    const rooms = await Rooms.findAll({
      attributes: [
        ['id', 'room_id'],
        ['name', 'room_name'],
        ['current', 'players'],
      ],
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: { rooms },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const { room_id } = req.body;

    const room = await Rooms.findOne({
      where: {
        id: room_id,
      },
      attributes: [
        ['id', 'room_id'],
        ['name', 'room_name'],
        'current',
        'max',
        'speed',
        ['createdAt', 'created'],
        ['updatedAt', 'modified'],
      ],
      include: {
        model: Users,
        as: 'author',
        attributes: ['username', 'id'],
      },
    });

    if (!room) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.addRoom = async (req, res) => {
  try {
    const { room_name, max } = req.body;

    const newRoom = await Rooms.create({
      name: room_name,
      max,
      user_id: req.user.id,
    });

    const room = await Rooms.findOne({
      where: { id: newRoom.id },
      attributes: [
        ['id', 'room_id'],
        ['name', 'room_name'],
        'current',
        'max',
        'speed',
        ['createdAt', 'created'],
        ['updatedAt', 'modified'],
      ],
      include: {
        model: Users,
        as: 'author',
        attributes: ['username', 'id'],
      },
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.editRoom = async (req, res) => {
  try {
    const { room_id, room_name, max } = req.body;

    if (!room_name && !max) {
      return res.status(400).json({
        code: 1002,
        message: STATUS_CODE[1002],
      });
    }

    const room = await Rooms.findOne({
      where: {
        id: room_id,
      },
    });

    if (!room) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    room.update({
      name: room_name,
      max,
    });

    await room.save();

    const roomData = await Rooms.findOne({
      where: {
        id: room_id,
      },
      attributes: [['id', 'room_id'], ['name', 'room_name'], 'max'],
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: roomData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { room_id } = req.body;

    const room = await Rooms.findOne({
      where: {
        id: room_id,
      },
    });

    if (!room) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    await Rooms.destroy({
      where: {
        id: room_id,
      },
      force: true,
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};
