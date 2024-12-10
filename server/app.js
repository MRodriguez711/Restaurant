const express = require("express");
const app = express();
const bodyParser = require('body-parser');

var cors = require('cors')
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  //curly braces= JSON obj.

var server;
var port = process.env.PORT || process.env.NODE_PORT || 5000



//Service Listeners (data processes) (done after router.js)
var services = require('./services.js')
services.services(app);
//services.initializeDatabase(); 

var port = 5000;

//Listen
server = app.listen(port, function(err){
    if (err) {
        throw err;
      }
    console.log("Listening on port: " + port);
});