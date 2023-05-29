import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

import AddPost from './components/AddPost';
import Post from './components/Post';
import PostsList from './components/PostsList';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

// import AuthVerify from "./common/AuthVerify";
import EventBus from './common/EventBus';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (['/login', '/register'].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    // if (currentUser) {
    //   setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'));
    //   setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
    // } else {
    //   setShowModeratorBoard(false);
    //   setShowAdminBoard(false);
    // }

    EventBus.on('logout', () => {
      logOut();
    });

    return () => {
      EventBus.remove('logout');
    };
  }, [currentUser, logOut]);


  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          Learn Swap
        </Link>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link'>
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className='nav-item'>
              <Link to={'/admin'} className='nav-link'>
                Admin Board
              </Link>
            </li>
          )}

          {/* {currentUser && (
            <li className='nav-item'>
              <Link to={'/user'} className='nav-link'>
                User
              </Link>
            </li>
          )} */}
        </div>

        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.name}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/add'} className='nav-link'>
                Add
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Login
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={'/signup'} className='nav-link'>
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              {/* <Link to={'/posts'} className='nav-link'>
                Posts
              </Link> */}
            </li>
            <li className='nav-item'>
              <Link to={'/add'} className='nav-link'>
                Add
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className='container mt-3'>
        <Routes>
          {/* <Route path='/' element={<Navigate replace to='/login' />} /> */}

          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/home' element={PostsList} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user' element={<BoardUser />} />
          <Route path='/mod' element={<BoardModerator />} />
          <Route path='/admin' element={<BoardAdmin />} />
          <Route path='/' element={<PostsList />} />
          <Route path='/posts' element={<PostsList />} />
          <Route path='/add' element={<AddPost />} />
          <Route path='/posts/:id' element={<Post />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
