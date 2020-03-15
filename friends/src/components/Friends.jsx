import React from 'react';

// Styled components
import styled from 'styled-components';

const Card = styled.div`

`

const Friends = ({ data }) => {
  // Guard against no data
  if (!data) return <h2>Data is loading...</h2>

  // Else render the main component with a card for each friend
  return (
    <Card>
      data.map(friend => <div>Friend #{Friends.id}</div>)
    </Card>
  );
}

export default Friends;
