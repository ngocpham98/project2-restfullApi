const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const STATUS_CODE = require('../constants');

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user existed
    const isUserExisted = await Users.findOne({ where: { username } });
    if (isUserExisted) {
      res.status(400).json({
        code: 9996,
        message: STATUS_CODE[9996],
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      username,
      password: hashedPassword,
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

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });
    if (!user) {
      res.status(400).json({
        code: 9995,
        message: STATUS_CODE[9995],
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      res.status(400).json({
        code: 1004,
        message: STATUS_CODE[1004],
      });
    }

    // generate token
    const token = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d',
      }
    );

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: {
        token,
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        is_block: user.is_block,
        is_admin: user.is_admin
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

exports.logout = (_, res) => {
  try {
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

exports.changeInfor = async (req, res) => {
  try {
    const { username, avatar, email } = req.body;

    const user = await Users.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(400).json({
        code: 9995,
        message: STATUS_CODE[9995],
      });
    }

    user.update({
      username,
      avatar,
      email,
    });

    await user.save();

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: {
        avatar,
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

exports.getUserInfo = async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await Users.findOne({ where: { id: user_id || req.user.id } });
    if (!user) {
      res.status(400).json({
        code: 9995,
        message: STATUS_CODE[9995],
      });
    }

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: {
        user_id: user.id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
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

exports.changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;

    const user = await Users.findOne({
      where: { username: req.user.username },
    });
    if (!user) {
      res.status(400).json({
        code: 9995,
        message: STATUS_CODE[9995],
      });
    }

    const isMatchPassword = await bcrypt.compare(old_password, user.password);

    if (!isMatchPassword) {
      res.status(400).json({
        code: 1004,
        message: STATUS_CODE[1004],
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.update({
      password: hashedPassword,
    });

    await user.save();

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

exports.setBlock = async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      res.status(400).json({
        code: 9995,
        message: STATUS_CODE[9995],
      });
    }

    user.update({
      is_block: '1',
    });

    await user.save();

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

exports.getListBlock = async (_, res) => {
  try {
    const users = await Users.findAll({
      where: { is_block: '1' },
      attributes: [['id', 'user_id'], 'username', 'avatar'],
    });

    res.json({
      code: 1000,
      message: STATUS_CODE[1000],
      data: { users },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 9999,
      message: STATUS_CODE[9999],
    });
  }
};
