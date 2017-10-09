var Posts = require('./posts.model');

var helpers = {};

helpers.populateDb = function(){
	var promise2 = Posts.get();
	promise2.then(function(data){
		
		if(data.length){
			console.log('posts table already populated.');
		}
		else{
			console.log('Populating posts table.');
			Posts.seed();	
		}
	});
};

module.exports = helpers;
