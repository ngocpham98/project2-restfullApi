module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      as: 'author',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
    Comments.belongsTo(models.Rooms, {
      foreignKey: {
        name: 'room_id',
        allowNull: false,
      },
    });
  };

  return Comments;
};
