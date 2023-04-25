const { Comments, Rooms, Users } = require('../models');
const STATUS_CODE = require('../constants');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
  try {
    const { keyword, index, count } = req.body;

    const comments = await Comments.findAll({
      where: {
        content: {
          [Op.substring]: keyword,
        },
      },
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
      attributes: [['id', 'comment_id'], 'content', ['createdAt', 'created']],
      include: {
        model: Users,
        as: 'author',
        attributes: ['username', 'id', 'avatar'],
      },
    });

    const rooms = await Rooms.findAll({
      where: {
        name: {
          [Op.substring]: keyword,
        },
      },
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
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

    const users = await Users.findAll({
      where: {
        username: {
          [Op.substring]: keyword,
        },
      },
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
      attributes: [['id', 'user_id'], 'username', 'avatar', 'email'],
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: {
        result: {
          comments,
          rooms,
          users,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};
