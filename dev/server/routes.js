var api = require('./api');

var routes = function(app){
	api(app);
};

module.exports = routes;