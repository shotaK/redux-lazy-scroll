var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var cors = require('cors');
var path = require('path');

var configs = require('./config');
var routes = require('./routes');
var helperFunctions = require('./helperFunctions');

var app = express();
db.on('error', console.error);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
helperFunctions.populateDb();

routes(app);

app.use('/posts',express.static('posts'));
app.use('/',express.static('client'));

app.listen(configs.applicationPort, function () {
  console.log('App is running on port: '+configs.applicationPort);
});
