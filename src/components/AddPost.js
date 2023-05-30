import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts';

const AddPost = () => {
  const initialPostState = {
    UserId: '',
    title: '',
    content: '',
    parentId: '',
    username: '',
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {
    const { title, content, parentId, UserId, username} = post;

    dispatch(createPost(title, content, parentId, UserId, username))
      .then((data) => {
        setPost({
          UserId: JSON.parse(localStorage.getItem('user')).userID,
          title: data.title,
          content: data.description,
          parentId: parentId,
          username: localStorage.getItem("username"),
                });
        setSubmitted(true);

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPost = () => {
    setPost(initialPostState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={newPost}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={post.title}
              onChange={handleInputChange}
              name='title'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='content'>Content</label>
            <input
              type='text'
              className='form-control'
              id='content'
              required
              value={post.content}
              onChange={handleInputChange}
              name='content'
            />
          </div>

          <button onClick={savePost} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPost;
