let logging = require(__dirname+"/logging.js")



function getContacts(app) {    
    app.post('/api/test', function (req, response) {
        logging.LOG(__filename,7,logging.textColor.Blue+"GetContacts:"+logging.textColor.White+JSON.stringify(req.body))
        response.send("Oki doki");
       
    });   
}


module.exports = {
    getContacts: getContacts
}