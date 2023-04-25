const { Notifications } = require('../models');
const STATUS_CODE = require('../constants');

exports.getNotifications = async (req, res) => {
  try {
    const { index, count } = req.body;

    const notifications = await Notifications.findAll({
      attributes: [
        ['id', 'notification_id'],
        'type',
        'content',
        'unread',
        'url',
        'object_id',
      ],
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: { notifications },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.setReadNoti = async (req, res) => {
  try {
    const { notification_id } = req.body;

    const notification = await Notifications.findOne({
      where: {
        id: notification_id,
      },
    });

    if (!notification) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    notification.update({
      unead: '0',
    });

    await notification.save();

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
