module.exports = (sequelize, DataTypes) => {
  const Push = sequelize.define('Push', {
    new_roommate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    new_room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    news: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Push;
};
