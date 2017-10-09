var postModel = require('./posts.model');

var posts = {};

posts.get = function (req, res) {
	
	var skip = req.query.skip;
	var limit = req.query.limit;

	var postsData = postModel.get(skip, limit);
	postsData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		// delay the api response to properly demonstrate lazy scrolling functionality
    setTimeout((function() {res.send(response)}), 1000);
	}, function(err){
		res.send(err);
	});

};

module.exports = posts;