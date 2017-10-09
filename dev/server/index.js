var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();
var cors = require('cors');

db.on('error', console.error);

var configs = require('./config');
var routes = require('./routes');
var helperFunctions = require('./helperFunctions');

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
