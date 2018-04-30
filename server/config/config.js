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
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
