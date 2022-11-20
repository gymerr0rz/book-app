import React, { useImperativeHandle, useEffect } from 'react';
import User from './User';
import { Container, NavLinksStyled, LogoStyled } from './Navbar.styled';
import Logo from '../assets/white-logo.png';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container className="navBar">
      <NavLinksStyled className="navLinks">
        <ul>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/books">Books</CustomLink>
          <CustomLink to="/history">History</CustomLink>
        </ul>
      </NavLinksStyled>
      <LogoStyled className="logo">
        <img src={Logo} alt="Logo" />
      </LogoStyled>
      <User />
    </Container>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
