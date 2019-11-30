var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var logging = require(__dirname + "/Backend/logging.js")
var serverAPIs = require(__dirname + "/Backend/serverAPIs.js")
var serverDB = require(__dirname+ "/Backend/herokuMariaDB.js")


const app = express();
var port = process.env.PORT || 5000;
app.listen(port);

logging.GOD("Voting is up ma dude, on Port:"+port)
logging.testLogging()

app.use(express.json());
app.use(serveStatic(__dirname + "/Frontend/dist"));


serverAPIs.getContacts(app)
