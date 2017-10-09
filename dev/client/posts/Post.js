import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => {
  return (
    <div className="col-md-3 posts-lazy-scroll__item" key={post._id}>
      <article className="panel panel-success">
        <header className="panel-heading">
          <h2 className="panel-title"> {post.name} </h2>
        </header>
        <p className="panel-body"> {post.description} </p>
      </article>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
