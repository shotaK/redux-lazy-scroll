var posts = require('./posts.controller');

var routesAPI = function(app){
	app.get('/posts', posts.get);
};

module.exports = routesAPI;