import React, { useState } from 'react';

// Helper functions
import { updateFriend, deleteFriend } from './../utils/actions';

// SVGs
import { ReactComponent as TrashSvg } from './../trash.svg';
import { ReactComponent as EditSvg } from './../edit.svg';

// Styled components
import styled from 'styled-components';

const Card = styled.form`
  margin: 1%;
  opacity: 0.95;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  width: 23rem;
  height: 15rem;
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

    & > div > svg {
      path {
        transition: all 0.3s ease;
        fill: #444;
      }
    }
  }
`;

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

const Icon = styled.div`
  position: relative;
  margin-bottom: 0.5rem;

  svg {
    background: white;
    position: absolute;
    z-index: 0;
    width: 20px;
    height: 20px;

    path {
      fill: #3434;
    }
  }
`

const TrashIcon = styled(Icon)`
  svg {
    top: 0.3em;
    right: 3%;
  }

  &:hover {
    svg > path {
      transition: all 0.3s ease;
      fill: crimson !important;
    }
  }
`

const EditIcon = styled(Icon)`
  svg {
    top: 0.5em;
    right: 2.5%;
  }

  &:hover {
    svg > path {
      transition: all 0.3s ease;
      fill: dodgerblue !important;
    }
  }
`

/**
 * @function: A card displaying the data for a single friend
 * @param {*} data: An object containing id, name, age, and email
 * @returns {JSX}: The JSx to render  
 */
const Friend = ({ data, setFriends }) => {
  const [isEditing, setIsEditing] = useState(false);
  const initialInputState = { name: '', age: '', email: '', id: data.id };
  const [input, setInput] = useState(initialInputState);

  // Local helper function
  const toggleEditing = () => {
    // Toggle editing mode
    setIsEditing(!isEditing);
  }

  const removeFriend = id => {
    deleteFriend(id)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => console.error(err.response));
  }

  const editFriend = friend => {
    updateFriend(friend)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => console.error(err.response));
  }

  // Handlers
  const handleClick = () => {
    toggleEditing();
  };

  const handleChange = event => {
    // Only update the input value with that name
    event.preventDefault();
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    // Update the Friend in the API using the submitted form data
    event.preventDefault();
    editFriend(input); // update the Friend object in the API
    setInput(initialInputState); // reset the input values
    toggleEditing(); // reset the editing flag
    event.target.reset(); // clear the form
  };

  return (
    // Conditionally render form elements if isEditing is true
    // Otherwise, render the simple text elements
    <Card onSubmit={handleSubmit}>
      <TrashIcon onClick={e => removeFriend(data.id)}>
        <TrashSvg />
      </TrashIcon>
      <EditIcon onClick={handleClick}>
        <EditSvg />
      </EditIcon>
      {isEditing ? (
        <Input
          name="name"
          value={input.name}
          placeholder={data.name}
          onChange={handleChange}
        />
      ) : (
        <h2>{data.name}</h2>
      )}
      {isEditing ? (
        <Input
          name="age"
          value={input.age}
          placeholder={data.age}
          onChange={handleChange}
        />
      ) : (
        <p>Age: {data.age}</p>
      )}
      {isEditing ? (
        <Input
          name="email"
          value={input.email}
          placeholder={data.email}
          onChange={handleChange}
        />
      ) : (
        <p>Email: {data.email}</p>
      )}
      {isEditing ? (
        <Input type="submit" value="Submit"></Input>
      ) : (
        null
      )}
    </Card>
  );
};

export default Friend;