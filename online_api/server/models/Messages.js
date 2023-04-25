module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unread: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1',
    },
  });

  Messages.associate = (models) => {
    Messages.belongsTo(models.Conversations, {
      foreignKey: {
        name: 'coversation_id',
        allowNull: false,
      },
    });

    Messages.belongsTo(models.Users, {
      foreignKey: {
        name: 'partner_id',
        allowNull: false,
      },
    });
  };

  return Messages;
};
