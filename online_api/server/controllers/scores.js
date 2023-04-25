const { Scores } = require('../models');
const STATUS_CODE = require('../constants');

exports.getScore = async (req, res) => {
  try {
    const { index, count, user_id } = req.body;

    if (req.user.is_admin === '0' && parseInt(user_id) !== req.user.id) {
      return res.status(400).json({
        code: 1004,
        message: STATUS_CODE[1004],
      });
    }

    const score = await Scores.findOne({
      where: {
        user_id,
      },
      attributes: ['room_id', 'last_score', ['createdAt', 'created']],
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    if (!score) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: score,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.getScoreDetail = async (req, res) => {
  try {
    const { room_id } = req.body;

    const scores = await Scores.findAll({
      where: {
        room_id,
      },
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: scores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};
