module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define('Conversations', {
    unread: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1',
    },
  });

  Conversations.associate = (models) => {
    Conversations.belongsTo(models.Users, {
      as: 'partner',
      foreignKey: {
        name: 'partner_id',
        allowNull: false,
      },
    });

    Conversations.hasMany(models.Messages, {
      onDelete: 'cascade',
      as: 'messages',
      foreignKey: {
        name: 'conversation_id',
        allowNull: false,
      },
    });
  };

  return Conversations;
};
