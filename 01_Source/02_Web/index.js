var express = require('express');

var serveStatic = require('serve-static');
const Lumie = require('lumie')
const bodyParser = require('body-parser')
const Morgan = require('morgan')
const path = require('path')
const { sequelize } = require('./Backend/models')
const config = require('./Backend/config/config.js')

var logging = require(__dirname + "/Backend/logging.js")

var serverMQTT = require(__dirname + "/Backend/herokuCloudMQTT.js")

const PORT = config.port

const app = express();
app.use(bodyParser.json())
app.use(Morgan())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  Lumie.load(app, {
    verbose: true, // process.env.NODE_ENV === 'dev'
    preURL: 'api',
    ignore: ['*.spec', '*.action'],
    controllers_path: path.join(__dirname, '/Backend/controllers')
  })


sequelize.sync({ force: false,  logging: true } ) // { force: true } - To reset DB insert this inside the parenthesis
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      logging.LOG(__filename, 40,`Server listening on port ${PORT}`)
    })
  })


logging.GOD(`Voting is up on Port:${PORT}`)
logging.testLogging()

app.use(express.json());
app.use(serveStatic(__dirname + "/Frontend/dist"));



// serverDB.connectToDB()
