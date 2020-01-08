var express = require('express');
const Lumie = require('lumie')
const bodyParser = require('body-parser')
const Morgan = require('morgan')
const path = require('path')
const { sequelize } = require('./models')
var serverMQTT = require("./herokuCloudMQTT.js")
const config = require('./config/config.js')

var logging = require("./logging.js")

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
    controllers_path: path.join(__dirname, '/controllers')
  })


sequelize.sync({ force: false,  logging: true } ) // { force: true } - To reset DB insert this inside the parenthesis
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      logging.LOG(__filename, 40,`Server listening on port ${PORT}`)
    })
  })


logging.GOD(`Voting is up on Port:${PORT}`)
logging.testLogging()

app.use(express.json());