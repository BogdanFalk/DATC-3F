const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT || 5001,
  db: {
    database: process.env.DB_NAME || 'heroku_d31465456df395f',
    user: process.env.DB_USER || 'b1eaa6835e3d54',
    password: process.env.DB_PASS || '5f2932f4',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'eu-cdbr-west-02.cleardb.net',
      port: process.env.DB_PORT || '3306'
    }
  }
}
