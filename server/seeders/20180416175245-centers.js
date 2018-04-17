module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Centers', [{
    centerName: 'Balmoral',
    description: 'Best event center you can think of',
    location: 'ikeja',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'www.imagecenter.com',
    capacity: 500,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Centers', null, {}),
};
