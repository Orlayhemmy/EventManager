/** Events database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Events model
 */
export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookedDate: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  Events.associate = (models) => {
    Events.belongsTo(models.Centers, {
      foreignKey: 'centerId',
    });
    Events.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Events.hasMany(models.Activities, { 
      foreignKey: 'eventId',
    })
  };
  return Events;
};
