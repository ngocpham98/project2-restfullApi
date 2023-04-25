const { Reports } = require('../models');
const STATUS_CODE = require('../constants');

exports.createReport = async (req, res) => {
  try {
    const { user_id, room_id, content } = req.body;

    await Reports.create({
      content,
      user_id,
      room_id,
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
