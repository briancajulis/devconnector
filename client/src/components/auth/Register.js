import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const inputChangeHandler = event => {
    // get the form name and update according to that form name
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onFormSubmit = async event => {
    event.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      //   // Testing purposes
      //   const newUser = {
      //     name,
      //     email,
      //     password
      //   };
      //   try {
      //     const config = {
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     };
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post('/api/user', body, config);
      //     console.log(res.data);
      //     console.log('Success');
      //   } catch (err) {
      //     console.error(err.response.data);
      //   }
      console.log('Success');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onFormSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            required
            value={name}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={inputChangeHandler}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={inputChangeHandler}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
