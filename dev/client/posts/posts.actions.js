import axios from 'axios';

import { processErrorRes } from '../common/utils';
import { API_URL } from '../common/configs';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS= 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POSTS_FAILURE';

export const requestError = (error) => ({
  type: POSTS_FAILURE,
  errorMessage: error
});

export const postsSuccess = (posts) => {
  return {
    type: POSTS_SUCCESS,
    posts,
    hasMore: posts.length > 0
  }
};

export const requestPosts = (skip, limit) => ({
  type: POSTS_REQUEST,
  skip: skip + limit,
  limit
});

export function fetchPosts(skip, limit) {
  return (dispatch) => {
    dispatch(requestPosts(skip, limit));
    return axios.get(`${API_URL}/posts?skip=${skip}&limit=${limit}`)
      .then(response => {
        const { data } = response;
        if (data.status === "success") {
          dispatch(postsSuccess(data.data));
        } else {
          dispatch(requestError(data.error));
        }
      })
      .catch((error) => dispatch(requestError(processErrorRes(error))));
  }
}