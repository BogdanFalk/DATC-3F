var mqtt = require('mqtt')
var url = require('url')
let logging = require(__dirname+"/logging.js")


var mqtt_url = url.parse("mqtt://tdwxzugj:d_fqjDDejMBg@farmer-01.cloudmqtt.com:12858");
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.connect(mqtt_url, {
  username: auth[0],
  password: auth[1]
});


module.exports =
{
  client
}