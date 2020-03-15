import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Styled components
import styled from 'styled-components';
import { logout } from '../utils/actions';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const LogoContainer = styled.div`
  display: flex;
  width: 75%;
`

const Logo = styled.div`
  background-image: url('https://famfonts.com/wp-content/uploads/friends-wide.png');
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: 200px 66px;
  width: 200px;
  height: 66px;
  margin: 1% 3% 1% 1%;
`

const NavLinks = styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 12px;
`
const NavLink = styled.li`
  list-style: none;
  margin-right: 6px;
  color: #204963;
`

const Header = () => {
  const history = useHistory();
  return (
    <Nav>
      <LogoContainer>
        <Logo />
        <h1>API</h1>
      </LogoContainer>
      <NavLinks>
        <NavLink>
          <Link to="/login">Login</Link>
        </NavLink>
        <NavLink>
          <Link to="/" onClick={e => logout(history)}>Logout</Link>
        </NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Header;
