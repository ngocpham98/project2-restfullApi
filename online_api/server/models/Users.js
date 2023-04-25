module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_block: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '0',
    },
    is_admin: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '0',
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Rooms, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });

    Users.hasMany(models.Comments, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });

    Users.hasMany(models.Reports, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });

    Users.hasMany(models.Conversations, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'partner_id',
        allowNull: false,
      },
    });

    Users.hasMany(models.Messages, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'partner_id',
        allowNull: false,
      },
    });

    Users.hasMany(models.Scores, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };

  return Users;
};
