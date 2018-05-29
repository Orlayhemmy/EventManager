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
    // url: 'postgres://liebwohs:vJE6zWFoCiSv7WsSojgoVhR-ieggIyR_@elmer.db.elephantsql.com:5432/liebwohs',
    // dialect: 'postgres',
    username: 'postgres',
    database: 'centermanager_test',
    password: 'profyem001',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
