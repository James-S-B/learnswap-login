import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { signup } from '../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  }
};

const vGrade = (value) => {
  if (value < 1 || value > 12) {
    return (
      <div className='alert alert-danger' role='alert'>
        This for is for student in grades 1 through 12.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [grade, setGrade] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeGrade = (e) => {
    const grade = e.target.value;
    setGrade(grade);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signup(name, username, email, password, grade))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <Input
                  type='name'
                  className='form-control'
                  name='name'
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <Input
                  type='text'
                  className='form-control'
                  name='username'
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Input
                  type='text'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <Input
                  type='password'
                  className='form-control'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='grade'>Grade</label>
                <Input
                  type='number'
                  className='form-control'
                  name='grade'
                  value={grade}
                  onChange={onChangeGrade}
                  validations={[required, vGrade]}
                />
              </div>

              <div className='form-group'>
                <button className='btn btn-primary btn-block'>Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className='form-group'>
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role='alert'
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
