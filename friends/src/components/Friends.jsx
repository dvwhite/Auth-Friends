import React, { useEffect, useState } from "react";
import Anime from 'react-anime';

// Helper functions
import { getAllFriends } from "../utils/actions";

// Component imports
import Friend from "./Friend";
import AddFriendForm from './AddFriendForm';

// Styled components
import styled from "styled-components";

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Friends = () => {
  // State
  const [friends, setFriends] = useState([]);

  // Animation state
  let animeProps = {
    easing: "easeOutElastic",
    opacity: [0, 1],
    translateY: '1rem',
    delay: (e, i) => i * 2500,
  }

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
        <Friend key={idx} data={friend} setFriends={setFriends} />
      ))}
      <Anime {...animeProps}>
        <AddFriendForm id={friends.length + 1} setFriends={setFriends} />
      </Anime>
    </Cards>
  );
};

export default Friends;
