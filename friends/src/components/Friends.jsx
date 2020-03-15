import React, { useEffect, useState } from "react";

// Styled components
import styled from "styled-components";
import { getAllFriends, deleteFriend } from "../utils/actions";

// SVGs
import { ReactComponent as TrashSvg } from "./../trash.svg";

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  margin: 1%;
  opacity: 0.95;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  width: 23rem;
  height: 9rem;
  overflow: hidden;
  word-wrap: break-word;
  overflow: hidden;
  transition: all 0.2s ease;
  z-index: 1;

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

const TrashIcon = styled.div`
  position: relative;

  svg {
    background: white;
    position: absolute;
    z-index: 0;
    top: 0.5em;
    right: 3%;
    width: 20px;
    height: 20px;

    path {
      fill: #3434;
    }
  }

  &:hover {
    svg > path {
      transition: all 0.3s ease;
      fill: crimson !important;
    }
  }
`;

const Friends = () => {
  const [friends, setFriends] = useState([]);

  // Fetch friends list on initial mount
  useEffect(() => {
    getAllFriends()
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.error(err.response));
  }, []);

  // Local helper function
  const removeFriend = id => {
    deleteFriend(id)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => console.error(err.response));
  }

  // Guard against no data
  if (!friends) return <h2>Friends data is loading...</h2>;

  // Else render the main component with a card for each friend
  return (
    <Cards>
      {friends.map((friend, idx) => (
        <Card key={idx}>
          <TrashIcon onClick={e => removeFriend(friend.id)}>
            <TrashSvg />
          </TrashIcon>
          <h2>{friend.name}</h2>
          <p>Age: {friend.age}</p>
          <p>Email: {friend.email}</p>
        </Card>
      ))}
    </Cards>
  );
};

export default Friends;
