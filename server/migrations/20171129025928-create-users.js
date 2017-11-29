module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.createTable('Users', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          fname: {
              type: Sequelize.STRING,
              allowNull: false
          },
          username: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true
          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false
          },
          isAdmin: {
              type: Sequelize.BOOLEAN,
              defaultValue: false
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          }
      });
  },
  down: (queryInterface) => {
      queryInterface.dropTable('Users');
  }
};