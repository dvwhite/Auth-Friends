import React, { useEffect, useState } from "react";

// Helper functions
import { getAllFriends, deleteFriend } from "../utils/actions";

// Component imports
import Friend from './Friend';

// Styled components
import styled from 'styled-components';

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
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

  // Guard against no data
  if (!friends) return <h2>Friends data is loading...</h2>;

  // Else render the main component with a card for each friend
  return (
    <Cards>
      {friends.map((friend, idx) => (
        <Friend key={idx} data={friend} setFriends={setFriends}/>
      ))}
    </Cards>
  );
};

export default Friends;
