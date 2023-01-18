import React from 'react';
import { Container, NavLinksStyled, LogoStyled } from './Navbar.styled';
import Logo from '../assets/white-logo.png';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container>
      <LogoStyled>
        <CustomLink to="/">
          <img src={Logo} alt="Logo" />
        </CustomLink>
      </LogoStyled>
      <NavLinksStyled className="navLinks">
        <ul>
          <CustomLink to="/">
            <span className="block">
              <i class="fa fa-house"></i>
              Home
            </span>
          </CustomLink>
          <CustomLink to="/library">
            <span className="block">
              <i class="fa fa-book-open"></i>
              Books
            </span>
          </CustomLink>
          <CustomLink to="/history">
            <span className="block">
              <i class="fa fa-history"></i>
              History
            </span>
          </CustomLink>
        </ul>
      </NavLinksStyled>
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
