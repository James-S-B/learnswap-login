import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../actions/posts';
import PostDataService from '../services/PostService';
import ReactPaginate from 'react-paginate';

const Post = (props) => {
  const initialPostState = {
    id: null,
    title: '',
    description: '',
    published: false,
  };
  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const getPost = (id) => {
    PostDataService.get(id)
      .then((response) => {
        setCurrentPost(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPost(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentPost.id,
      title: currentPost.title,
      description: currentPost.description,
      published: status,
    };

    dispatch(updatePost(currentPost.id, data))
      .then((response) => {
        console.log(response);

        setCurrentPost({ ...currentPost, published: status });
        setMessage('The status was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePost(currentPost.id, currentPost))
      .then((response) => {
        console.log(response);

        setMessage('The post was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removePost = () => {
    dispatch(deletePost(currentPost.id))
      .then(() => {
        props.history.push('/posts');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPost ? (
        <div className='edit-form'>
          <h4>Post</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={currentPost.description}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentPost.published ? 'Published' : 'Pending'}
            </div>
          </form>

          {currentPost.published ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className='badge badge-danger mr-2' onClick={removePost}>
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Post...</p>
        </div>
      )}
    </div>
  );
};

export default Post;
