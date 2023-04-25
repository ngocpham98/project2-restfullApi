const { Push } = require('../models');
const STATUS_CODE = require('../constants');

exports.getPush = async (_, res) => {
  try {
    const push = await Push.findAll({
      attributes: ['new_roommate', 'new_room', 'news'],
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: push[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.setPush = async (req, res) => {
  try {
    const { new_roommate, new_room, news } = req.body;

    await Push.create({
      new_roommate,
      new_room,
      news,
    });

    const pushData = await Push.findAll({
      attributes: ['new_roommate', 'new_room', 'news'],
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: pushData[pushData.length - 1],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};
