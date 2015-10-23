// database
var mongoose = require('mongoose');
var config = require('./config');
// mongodb.conf bind_ip ;)

var mongoFullUrl = 'mongodb://'+config.database.host+':'+config.database.port+':'+'/'+config.database.name
mongoose.connect(mongoFullUrl, function(err) {
  if(err) {
    console.error("Can't connect database", err);
    console.error("This is a fatal error, api is down");
  } else {
    console.log('Connected to database');
    startListening();
  }
});

// routes
var depItemRoutes = require('./routes/depItem');

// express
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

/**
 * Start listening to the trips HTTP requests
 */
function startListening(){
  app.use(bodyParser.json());
  app.use('/', depItemRoutes);

  console.log('Listening on port ',config.api.port);
  app.listen(config.api.port);
}