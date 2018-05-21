export default (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    suggestion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    centerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Centers',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });
  Activities.associate = (models) => {
    Activities.belongsTo(models.Events, {
      foreignKey: 'eventId',
    });
    Activities.belongsTo(models.Centers, {
      foreignKey: 'centerId',
    });
    Activities.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Activities;
};
