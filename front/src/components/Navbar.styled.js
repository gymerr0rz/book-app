import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  align-items: center;
  width: 100vw;
  height: 15vh;
  background-color: rgba(9, 9, 11, 0.99);
  p,
  a {
    color: #fff;
  }
`;

const NavLinksStyled = styled.div`
  font-family: 'Jetbrains Mono';
  ul {
    display: flex;
    list-style: none;
  }
  li {
    text-transform: uppercase;
    padding: 1rem;
  }
  li a {
    transition: color 0.2s ease;
  }
  li a:hover {
    color: #6c63ff;
    transition: color 0.2s ease;
  }
`;

const LogoStyled = styled.div`
  img {
    height: 90px;
  }
`;

export { Container, NavLinksStyled, LogoStyled };
