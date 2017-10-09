var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var routes = require('./routes');

var app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

app.use('/posts',express.static('posts'));
app.use('/',express.static('client'));

const port = process.env.PORT || 3000;
app.listen(port);
