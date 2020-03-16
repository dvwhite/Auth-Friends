import React, { useState } from "react";

// Helper functions
import { updateFriend, deleteFriend } from "./../utils/actions";

// SVGs
import { ReactComponent as TrashSvg } from "./../icons/trash.svg";
import { ReactComponent as EditSvg } from "./../icons/edit.svg";
import { ReactComponent as CancelSvg } from "./../icons/sm-cancel.svg";

// Styled components
import styled from "styled-components";

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

    & > div > svg {
      transition: all 0.3s ease;
      stroke: #444;

      path {
        fill: #444;
      }
    }
  }
`;

// The input elements on the form
const Input = styled.input`
  margin: 1%;
  padding: 2%:
  width: 40%;
  border-radius: 5px;
  border: 1px solid gray;
  outline: 0;
  align-self: center;

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
`;

// The base component for icons
const Icon = styled.div`
  position: relative;
  margin-bottom: 0.5rem;

  svg {
    background: white;
    position: absolute;
    z-index: 0;
    width: 20px;
    height: 20px;
    stroke: #3434;

    path {
      fill: #3434;
    }
  }
`;

// The trash icon that lets user delete the card
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
`;

// The edit icon that lets user launch the form to edit the card
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
`;

// The trash icon that lets user delete the card
const CancelIcon = styled(Icon)`
  svg {
    top: 0.3em;
    right: 3%;

    &:hover {
      transition: all 0.3s ease;
      stroke: red !important;
    }
  }
`;

/**
 * @function: A card displaying the data for a single friend
 * @param {*} data: An object containing id, name, age, and email
 * @returns {JSX}: The JSx to render
 */
const Friend = ({ data, setFriends }) => {
  // State
  const [isEditing, setIsEditing] = useState(false);
  const initialInputState = { name: "", age: "", email: "", id: data.id };
  const [input, setInput] = useState(initialInputState);

  // Local helper function

  /**
   * @function toggleEditing: Flip the isEditing flag
   * @param: none
   * @returns: none
   */
  const toggleEditing = () => {
    // Toggle editing mode
    setIsEditing(!isEditing);
  };

  /**
   * @function removeFriend: A wrapper that sets the parent state with the resolved promise
   * @param {*} id: The id of the friend object to remove
   * @returns: none
   */
  const removeFriend = id => {
    deleteFriend(id)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.error(err.response));
  };

  /**
   * @function editFriend: A wrapper that sets the parent state with the resolved promise
   * @param {*} friend: The object expected by the PUSH operation in updateFriend
   * @returns: none
   */
  const editFriend = friend => {
    updateFriend(friend)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.error(err.response));
  };

  // Event handlers

  /**
   * @function handleClick: The click handler on the edit button
   * @param: none
   * @returns: none
   */
  const handleClick = () => {
    toggleEditing();
  };

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
    editFriend(input); // update the Friend object in the API
    setInput(initialInputState); // reset the input values
    toggleEditing(); // reset the editing flag
    event.target.reset(); // clear the form
  };

  // Content

  return (
    // Conditionally render form elements if isEditing is true
    // Otherwise, render the simple text elements
    <Card onSubmit={handleSubmit}>
      {/* The conditionally rendered content is below */}
      {/* The icons for deleting and editing this card */}
      {isEditing ? (
        <CancelIcon>
          <CancelSvg />
        </CancelIcon>
      ) : (
        <TrashIcon onClick={e => removeFriend(data.id)}>
          <TrashSvg />
        </TrashIcon>
      )}
      {!isEditing ? (
        <EditIcon onClick={handleClick}>
          <EditSvg />
        </EditIcon>
      ) : null}
      {/* Form or content elements */}
      {isEditing ? <h2>Edit the Friend</h2> : null}
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
      {isEditing ? <Input type="submit" value="Submit"></Input> : null}
      {/* End the conditionally rendered content */}
    </Card>
  );
};

export default Friend;
