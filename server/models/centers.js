/** Define Centers database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Centers model
 */
export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Centers.associate = (models) => {
    Centers.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Centers.hasMany(models.Events, {
      foreignKey: 'centerId',
    });
  };
  return Centers;
};
