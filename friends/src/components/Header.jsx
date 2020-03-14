import React from 'react';

// Styled components
import styled from 'styled-components';

const Nav = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 36px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`
const NavLink = styled.li`
  list-style: none;
  margin-right: 6px;
  color: #204963;
`

const Header = () => {
  return (
    <Nav>
      <NavLink>Log In</NavLink>
    </Nav>
  );
}

export default Header;