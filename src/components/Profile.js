import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  localStorage.setItem("name", currentUser.name);
  localStorage.setItem("token", currentUser.accessToken);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.userID}
      </p>
      <p>
        <strong>Name:</strong> {currentUser.name}
      </p>
      <strong>Authorities: {currentUser.authorities ? currentUser.authorities : "none"}</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
