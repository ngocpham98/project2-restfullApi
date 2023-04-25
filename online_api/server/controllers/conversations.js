const { Conversations, Users, Messages } = require('../models');
const STATUS_CODE = require('../constants');

exports.getListConversation = async (req, res) => {
  try {
    const { index, count } = req.body;

    const conversations = await Conversations.findAll({
      attributes: [
        ['id', 'conversation_id'],
        'unread',
        ['createdAt', 'created'],
      ],
      include: [
        {
          model: Users,
          as: 'partner',
          attributes: ['username', 'id', 'avatar'],
        },
      ],
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: conversations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { index, count, partner_id, conversation_id } = req.body;

    if (!partner_id && !conversation_id) {
      return res.status(400).json({
        code: 1002,
        message: STATUS_CODE[1002],
      });
    }

    const conversation = await Conversations.findOne({
      where: {
        id: conversation_id,
        partner_id,
      },
      attributes: [
        ['id', 'conversation_id'],
        'unread',
        ['createdAt', 'created'],
      ],
      include: [
        {
          model: Users,
          as: 'partner',
          attributes: ['username', 'id', 'avatar'],
        },
        {
          model: Messages,
          as: 'messages',
          attributes: ['id', 'content', ['createdAt', 'created'], 'unread'],
        },
      ],
      offset: parseInt(index) || 0,
      limit: parseInt(count) || 20,
    });

    if (!conversation) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { partner_id, conversation_id } = req.body;

    if (!partner_id && !conversation_id) {
      return res.status(400).json({
        code: 1002,
        message: STATUS_CODE[1002],
      });
    }

    await Conversations.destroy({
      where: {
        id: conversation_id,
        partner_id,
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

exports.deleteMessage = async (req, res) => {
  try {
    const { partner_id, message_id } = req.body;

    if (!partner_id && !message_id) {
      return res.status(400).json({
        code: 1002,
        message: STATUS_CODE[1002],
      });
    }

    await Messages.destroy({
      where: {
        id: message_id,
        partner_id,
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

exports.setReadMessage = async (req, res) => {
  try {
    const { message_id } = req.body;

    const message = await Messages.findOne({
      where: {
        id: message_id,
      },
    });

    if (!message) {
      return res.status(404).json({
        code: 9994,
        message: STATUS_CODE[9994],
      });
    }

    await message.update({
      unread: '0',
    });

    await message.save();

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
