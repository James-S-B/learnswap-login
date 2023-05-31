import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts';

const AddPost = () => {
  const initialPostState = {
    username: `${JSON.parse(localStorage.getItem('user')).username}`,
    UserId: JSON.parse(localStorage.getItem('user')).userID,
    title: '',
    content: '',
<<<<<<< HEAD
    parentId: null,
=======
    parentId: '',
    username: '',
>>>>>>> f7fd50fc3c19e022b8fdf414d32184950f5cd428
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {
<<<<<<< HEAD
    const { username, title, content, parentId, UserId } = post;

    dispatch(createPost(username, title, content, parentId, UserId))
=======
    const { title, content, parentId, UserId, username} = post;

    dispatch(createPost(title, content, parentId, UserId, username))
>>>>>>> f7fd50fc3c19e022b8fdf414d32184950f5cd428
      .then((data) => {
        // console.log('data1 = ', data);
        // console.log(
        //   'data2 = ',
        //   JSON.parse(localStorage.getItem('user')).username
        // );
        setPost({
          username: data.username,
          UserId: data.UserId,
          title: data.title,
          content: data.description,
<<<<<<< HEAD
          parentId: data.parentId,
        });
=======
          parentId: parentId,
          username: localStorage.getItem("username"),
                });
>>>>>>> f7fd50fc3c19e022b8fdf414d32184950f5cd428
        setSubmitted(true);
        console.log(
          'JSON.parse(localStorage.getItem(user)).username = ',
          JSON.parse(localStorage.getItem('user')).username
        );
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
