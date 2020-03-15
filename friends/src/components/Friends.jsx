import React, { useEffect, useState } from "react";

// Styled components
import styled from "styled-components";
import { getAllFriends } from "../utils/actions";

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Card = styled.div`
  margin: 1%;
  opacity: 0.95;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  width: 20rem;
  height: 12rem;
  overflow: hidden;
  word-wrap: break-word;
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
        <Card key={idx}>
          <h2>{friend.name}</h2>
          <p>Age: {friend.age}</p>
        </Card>
      ))}
    </Cards>
  );
};

export default Friends;
