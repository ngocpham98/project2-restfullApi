const { Comments, Users } = require('../models');
const STATUS_CODE = require('../constants');

exports.getComments = async (req, res) => {
  try {
    const { index, count, user_id, room_id } = req.body;

    const comments = await Comments.findAll({
      where: {
        user_id,
        room_id,
      },
      attributes: [['id', 'comment_id'], 'content', ['createdAt', 'created']],
      include: {
        model: Users,
        as: 'author',
        attributes: ['username', 'id', 'avatar'],
      },
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: { comments },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.setComment = async (req, res) => {
  try {
    const { index, count, user_id, room_id, content } = req.body;

    await Comments.create({
      content,
      user_id,
      room_id,
    });

    const comments = await Comments.findAll({
      where: {
        user_id,
        room_id,
      },
      attributes: [['id', 'comment_id'], 'content', ['createdAt', 'created']],
      include: {
        model: Users,
        as: 'author',
        attributes: ['username', 'id', 'avatar'],
      },
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: { comments },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};
