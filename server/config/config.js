require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    database: 'centermanager',
    password: 'profyem001',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
  },
  test: {
    // username: 'postgres',
    // password: 'profyem001',
    // database: 'centermanager_test',
    // host: '127.0.0.1',
    // port: 5432,
    dialect: 'postgres',
    database: process.env.TESTDB_URL
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
