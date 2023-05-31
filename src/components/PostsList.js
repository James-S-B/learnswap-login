import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  retrievePosts,
  findPostsByTitle,
  deleteAllPosts,
  createPost,
} from '../actions/posts';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState('');

  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const AddReply = () => {
    const initialPostState = {
      username: `${JSON.parse(localStorage.getItem('user')).username}`,
      UserId: JSON.parse(localStorage.getItem('user')).userID,
      content: '',
      parentId: currentPost.id,
    };
    const [post, setPost] = useState(initialPostState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const savePost = () => {
      const { username, content, parentId, UserId } = post;

      dispatch(createPost(username, content, parentId, UserId))
        .then((data) => {
          setPost({
            username: data.username,
            UserId: data.UserId,
            content: data.content,
            parentId: data.parentId,
          });
          setSubmitted(true);

          console.log('post = ', post);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const newPost = () => {
      setPost(initialPostState);
      setSubmitted(false);
    };
  };

  useEffect(() => {
    dispatch(retrievePosts());
  }, []);

  const refreshData = () => {
    setCurrentPost(null);
    setCurrentIndex(-1);
  };

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findPostsByTitle(searchTitle));
  };

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title'
            value={searchTitle}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Posts List</h4>

        <ul className='list-group'>
          {posts.payload &&
            posts.payload.map((post, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActivePost(post, index)}
                key={index}
              >
                {post.title}
              </li>
            ))}
        </ul>

        {/* <button className='m-3 btn btn-sm btn-danger' onClick={removeAllPosts}>
          Remove All
        </button> */}
      </div>
      <div className='col-md-6'>
        {currentPost ? (
          <div>
            <h4>Post</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentPost.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentPost.content}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{' '}
              {currentPost.published ? 'Published' : 'Pending'}
            </div>

            <Link
              to={'/posts/' + currentPost.id}
              className='badge badge-warning'
            >
              Edit
            </Link>

            <div>
              <label>
                <strong>Asker:</strong>
              </label>{' '}
              {currentPost.username}
            </div>
            <Link
              to={'/add/'}
              state={{ parentId: currentPost.id, title: currentPost.title }}
              className='badge badge-warning'
            >
              Reply
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
