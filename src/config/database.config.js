const { config } = require('dotenv')
config()

module.exports = {
  dialect: process.env.DIALECT, 
  host: process.env.HOST,
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,

  dialectOptions: {
    ssl: {
    rejectUnauthorized: false,
    require: true
    }
    },
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
};