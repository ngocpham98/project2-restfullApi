module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
    max: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    speed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1',
    },
  });

  Rooms.associate = (models) => {
    Rooms.belongsTo(models.Users, {
      as: 'author',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });

    Rooms.hasMany(models.Comments, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'room_id',
        allowNull: false,
      },
    });

    Rooms.hasMany(models.Reports, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'room_id',
        allowNull: false,
      },
    });

    Rooms.hasMany(models.Scores, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'room_id',
        allowNull: false,
      },
    });
  };

  return Rooms;
};
