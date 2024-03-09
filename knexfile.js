// import Knex from 'knex';

// const knex = Knex(knexConfig[AppConfig.NODE_ENV]);

// export default knex;

require('ts-node').register()
const parseDbUrl = require('parse-database-url')

module.exports = require('./src/config/config').Knex.config