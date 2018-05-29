module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    fullname: 'John',
    password: '$2a$10$/HaQApiK8ZEuZcmgWAUHr.fwNMK3iJLMOnSWK3yGeor/2cuubnVUC',
    email: 'admin@test.com',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    fullname: 'Peter',
    password: '$2a$10$/HaQApiK8ZEuZcmgWAUHr.fwNMK3iJLMOnSWK3yGeor/2cuubnVUC',
    email: 'peter@test.com',
    isAdmin: 'false',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
