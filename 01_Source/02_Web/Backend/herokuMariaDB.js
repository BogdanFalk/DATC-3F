var mysql = require('mysql');
var tablesTemplates = require(__dirname + "/databaseTablesTemplates.js") 
let logging = require(__dirname+"/logging.js")

const DB_CONFIG = {
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bfbe415e9273cc',
    password: '3a4de949',
    database: 'heroku_62f9169e5b0ff7a'
  };

const DELETEONLOAD = true;


var connection = mysql.createConnection(DB_CONFIG);


function connectToDB() {
    connection.connect()
    if(DELETEONLOAD)
    {
        tablesTemplates.tables.forEach(table => {
            connection.query("DROP TABLE IF EXISTS "+table)
        });

        logging.LOG(__filename, 27, "Database cleared!")
    }
    connection.query(tablesTemplates.users, function (err, results, fields) {
        if (err) {
            logging.LOG(__filename,30,err.message);
        }
        else
        {
            logging.LOG(__filename,34,("Created "+logging.textColor.Blue+ "users" + logging.textColor.Green + " table if not exist!"));
        }
    });
        
}

function handleDisconnect() {
    connection = mysql.createConnection(DB_CONFIG); // Recreate the connection, since
    logging.LOG(__filename,42,"Reconnecting to DB due to Timeout");
}       

connection.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });

module.exports = {
    connectToDB: connectToDB
}