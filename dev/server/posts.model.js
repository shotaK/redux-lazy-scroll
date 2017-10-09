var q = require('q');

var postsModel = {};

var posts = [];
posts.push({name: "Thinking in React", description: "React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram."});
posts.push({name: "Start With A Mock", description: "Imagine that we already have a JSON API and a mock from our designer."});
posts.push({name: "Step 1: Break The UI Into A Component Hierarchy", description: "The first thing you’ll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names."});
posts.push({name: "Build A Static Version in React", description: "Now that you have your component hierarchy, it’s time to implement your app. The easiest way is to build a version that takes your data model and renders the UI but has no interactivity."});
posts.push({name: "Identify The Minimal (but complete) Representation Of UI State", description: "To make your UI interactive, you need to be able to trigger changes to your underlying data model. React makes this easy with state."});
posts.push({name: "Identify Where Your State Should Live", description: "OK, so we’ve identified what the minimal set of app state is. Next, we need to identify which component mutates, or owns, this state."});

var postsData = [];
for (var i = 0; i < 60; i++) {
  var index = i % 6;
  var postObject = JSON.parse(JSON.stringify(posts[index]));
  postObject.name = i + '. ' + postObject.name;
  postObject._id = i;
  postsData.push(postObject);
}

postsModel.get = function(skip, limit){
  var results = q.defer();

  skip = parseInt(skip);
  limit = parseInt(limit);

  var end = skip + limit;

  results.resolve(postsData.slice(skip, end));

  return results.promise;

};

module.exports = postsModel;