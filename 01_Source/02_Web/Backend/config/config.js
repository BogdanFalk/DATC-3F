const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || 'heroku_45e2d6c06603277',
    user: process.env.DB_USER || 'b932cb50edc7bf',
    password: process.env.DB_PASS || 'ef590f00',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'eu-cdbr-west-02.cleardb.net',
      port: process.env.DB_PORT || '3306'
    }
  }
}
