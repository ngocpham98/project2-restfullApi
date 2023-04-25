module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unread: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    object_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Notifications;
};
