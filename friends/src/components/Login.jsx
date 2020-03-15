import React, { useState } from 'react';
import { login } from './../utils/actions';
import { useHistory } from 'react-router-dom';

// Styled components
import styled from 'styled-components';

const Form = styled.form`

`

const Input = styled.input`

`

const Submit = styled.input`

`

const Login = (props) => {
  const history = useHistory();
  const [input, setInput] = useState({username:'', password:''})
  const credentials = { username: 'Lambda School', password: 'i<3Lambd4' };

  // Form input handlers
  const handleChange = e => {
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    login(input, history);
    setInput({username:'', password:''});
  }

  // The form component
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        value={input.username}
        placeholder={credentials.username}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        value={input.password}
        placeholder={credentials.password}
        onChange={handleChange}
      />
      <Submit type='submit' value='Log In' />
    </Form>
  );
}

export default Login;
