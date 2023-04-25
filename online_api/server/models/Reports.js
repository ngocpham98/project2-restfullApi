module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define('Reports', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Reports.associate = (models) => {
    Reports.belongsTo(models.Users, {
      as: 'author',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
    Reports.belongsTo(models.Rooms, {
      foreignKey: {
        name: 'room_id',
        allowNull: false,
      },
    });
  };

  return Reports;
};
