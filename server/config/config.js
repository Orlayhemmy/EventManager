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
    DATABASE_URL: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
