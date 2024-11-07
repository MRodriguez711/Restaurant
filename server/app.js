//web server
const express  = require('express');    //calling express library 
const path = require('path');
const bodyParser = require('body-parser');

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  //curly braces= JSON obj.

app.use("/client", express.static(path.resolve(__dirname + "/../client/" )));       //__dirname brings us to server folder

//Page listeners (router) (done after router.js)
var router = require('./router.js')
router(app);

//Service Listeners (data processes) (done after router.js)
var services = require('./services.js')
services(app);


var port = 5000;

//Listen
var server = app.listen(port, function(err){
    if(err) throw err;

    console.log("Listening on port: " + port);
});