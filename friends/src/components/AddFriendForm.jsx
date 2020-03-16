import React, { useState } from 'react';

// Actions
import { addFriend } from './../utils/actions';

// Styled components
import styled from 'styled-components';

// The form or card that will edit or display the friend data
// Please note: It's a form so that it can be conditionally rendered
// as either a form or a card
const Card = styled.form`
  margin: 1%;
  opacity: 0.95;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  width: 23rem;
  height: 13rem;
  overflow: hidden;
  word-wrap: break-word;
  overflow: hidden;
  transition: all 0.2s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transition: all 0.3s ease;
    box-shadow: 4px 4px 8px #444;
  }
`;

// The input elements on the form
const Input = styled.input`
  margin: 1%;
  padding: 2%:
  width: 50%;
  border-radius: 5px;
  border: 1px solid gray;
  outline: 0;
  align-self: center;

  @media (max-width: 1400px) {
    width: 55%;
  }

  @media (max-width: 1200px) {
    width: 60%;
  }

  @media (max-width: 1000px) {
    width: 65%;
  }

  &:focus {
    border: 1px solid dodgerblue;
    box-shadow: 2px 2px 4px dodgerblue;
  }

  &:last-of-type {
    margin-bottom: 5%;
  }
`;


const AddFriendForm = ({ id, setFriends }) => {
  // State
  const initialInputState = { name: "", age: "", email: "", id: id };
  const [input, setInput] = useState(initialInputState);

  // Event handlers

  /**
   * @function handleChange: The onchange handler on the input elements
   * @param {*} event: The event object captured by the onchange handler
   * @returns: none
   */
  const handleChange = event => {
    // Only update the input value with that name
    event.preventDefault();
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  /**
   * @function handleSubmit The onsubmit handler on the input elements
   * @param {*} event: The event object captured by the onsubmit handler
   * @returns: none
   */
  const handleSubmit = event => {
    // Update the Friend in the API using the submitted form data
    event.preventDefault();
    addFriend(input); // update the Friend object in the API
    setInput(initialInputState); // reset the input values
    event.target.reset(); // clear the form
  };

  return (
    <Card onSubmit={handleSubmit}>
      <h2>Add a Friend</h2>
      <Input
        name="name"
        value={input.name}
        placeholder='Name'
        onChange={handleChange}
      />
      <Input
        name="age"
        value={input.age}
        placeholder='Age'
        onChange={handleChange}
      />
      <Input
        name="email"
        value={input.email}
        placeholder='Email'
        onChange={handleChange}
      />
      <Input type="submit" value="Submit"></Input>
    </Card>
  );
}

export default AddFriendForm;
