module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define('Scores', {
    last_score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Scores.associate = (models) => {
    Scores.belongsTo(models.Users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });

    Scores.belongsTo(models.Rooms, {
      foreignKey: {
        name: 'room_id',
        allowNull: false,
      },
    });
  };

  return Scores;
};
