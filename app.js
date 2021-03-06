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
var webRoute = require('./routes/web');
var apiRoute = require('./routes/api');

// express
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');

/**
 * Start listening to the trips HTTP requests
 */
function startListening() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  
  // serve index and view partials
  app.get('/', webRoute.index);
  app.get('/create', webRoute.create);
  app.get('/partials/:name', webRoute.partials);

  // JSON API
  app.use('/api', apiRoute.api);

  // redirect all others to the 404
  app.get('*', webRoute.notfound);
  
  console.log('Listening on port ', config.api.port);
  app.listen(config.api.port);
}