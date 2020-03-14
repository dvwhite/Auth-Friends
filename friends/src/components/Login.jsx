import React, { useState } from 'react';
import { login } from './../utils/actions';

// Styled components
import styled from 'styled-components';

const Form = styled.form`

`

const Input = styled.input`

`

const Button = styled.input`

`

const Login = (props) => {
  const [input, setInput] = useState({username:'', password:''})
  const credentials = { username: 'Lambda School', password: 'i<3Lambd4' };

  // Form input handlers
  const handleChange = e => {
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    login(credentials)
      .then(res => {
        props.history.push('/friends');
      })
      .catch(err => console.log("Error in Login.handleSubmit:",err.response));
  }

  // The form component
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        value={credentials.username}
        placeholder='username'
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        value={credentials.password}
        placeholder='password'
        onChange={handleChange}
      />
      <Submit type='submit' value='Log In' />
    </Form>
  );
}

export default Login;
