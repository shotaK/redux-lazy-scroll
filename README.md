[![npm version](https://badge.fury.io/js/redux-lazy-scroll.svg)](https://badge.fury.io/js/redux-lazy-scroll)
![Heroku](http://heroku-badge.herokuapp.com/?app=ancient-sands-71156&style=flat&svg=1)

# Redux Lazy Scroll

React/Redux lazy scrolling functionality with full Redux implementation example.

## Features

* Scrollable inside element or window
* Compatible with async requests
* All of the retrieved data is persisted in Redux, thus the library obeys single source of truth principle
* Comes with a full implementation example of both <a href="https://github.com/shotaK/redux-lazy-scroll/tree/master/dev/client" target="_blank">client side</a> and <a href="https://github.com/shotaK/redux-lazy-scroll/tree/master/dev/server" target="_blank">server/api side</a>
* For flexibility the library does not contain any built in textual messages (for example: loading or error messages). Examples how to add them are provided.

## Demo

You can see the demo here: https://ancient-sands-71156.herokuapp.com/

## Installation

```npm install redux-lazy-scroll --save```

## Usage

```javascript

class PostsLazyScroll extends Component {

  constructor(props) {
    super(props);
    this.loadPosts = this.loadPosts.bind(this);
  }

  loadPosts() {
    const {skip, limit} = this.props.postEntity;
    this.props.postsActions.fetchPosts(skip, limit);
  }

  render() {
    const {posts, isFetching, errorMessage, hasMore} = this.props.postEntity;
    return (
      <div className="container posts-lazy-scroll">
        <ReduxLazyScroll
          isFetching={isFetching}
          errorMessage={errorMessage}
          loadMore={this.loadPosts}
          hasMore={hasMore}
        >
          {posts.map(post => (
            <Post
              key={post._id}
              post={post}
            />
            ))
          }
        </ReduxLazyScroll>
        <div className="row posts-lazy-scroll__messages">
          {isFetching && <div className="alert alert-info"> Loading more posts... </div>}

          {!hasMore && !errorMessage &&
            <div className="alert alert-success">All the posts has been loaded successfully.</div>
          }

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>
      </div>
    );
  }
}

```

## Examples

You can find full Redux example [here](https://github.com/shotaK/redux-lazy-scroll/tree/master/dev/client/posts)

## Props

| Props         | Type           | Required  | Default  | Description |
| ------------- |:--------------:| :--------:| :-------:| :----------:|
| hasMore       | bool           | no        | true     | Whether there are more items that will be coming with the next request |
| isFetching    | bool           | no        | false    | Should be set true while a request to api is being processed |
| errorMessage  | string or bool | no        | false    | Supply any error message that came from the api with this prop (this will help to avoid infinite loops in case of error) |
| loadMore      | func           | no        | () => {} | The function that will be called after every scroll down when threshold is passed (will be only called if `hasMore` is true) |
| threshold     | number         | no        | 100      | The number of pixels above the bottom side of the page that scrollbar needs to reach to trigger loadMore |
| isParentScrollable | bool      | no        | false    | Whether the scroll listener should be attached to the parent element or window |
| parentHeight  | number or string | if `isParentScrollable` is `true` | false | The height of the container parent element. Must be set if `isParentScrollable` is `true` |

## License

MIT License. Copyright (c) 2017 Shota