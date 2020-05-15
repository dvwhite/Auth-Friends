import React, { useState } from 'react';
import { login } from './../utils/actions';
import { useHistory } from 'react-router-dom';

// Styled components
import styled from 'styled-components';

const Form = styled.form`
  margin: 3%;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  margin: 1%;
  width: 20%;
  border-radius: 5px;
  border: 1px solid gray;
  outline: 0;

  @media (max-width: 1400px) {
    width: 30%;
  }

  @media (max-width: 1200px) {
    width: 40%;
  }

  @media (max-width: 1000px) {
    width: 50%;
  }

  &:focus {
    border: 1px solid dodgerblue;
    box-shadow: 2px 2px 4px dodgerblue;
  }
`

const Submit = styled.input`
  margin: 1%;
  width: 10em;
`

const Login = (props) => {
  const history = useHistory();
  const [input, setInput] = useState({username:'', password:''})

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
        placeholder={'username'}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        value={input.password}
        placeholder={'password'}
        onChange={handleChange}
      />
      <Submit type='submit' value='Log In' />
    </Form>
  );
}

export default Login;
