// {
//   "development": {
//     "use_env_variable": "PG_DATABASE_URI"
//   },
//   "production": {
//     "use_env_variable": "PG_DATABASE_URI"
//   }
// }
require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.PG_USER,
    'password': process.env.PG_PASSWORD,
    'database': process.env.PG_DATABASE,
    'host': process.env.PG_HOST,
    'port': process.env.PG_PORT,
    'dialect': 'postgres',
    'dialectOptions':{
      'ssl': {
        'require': true,
        'rejectUnauthorized': false
      }
    }
  },
};