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
    username: process.env.DB_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'database_test',
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
