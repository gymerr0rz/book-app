import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 0 100px;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 15vh;
  background-color: rgba(9, 9, 11, 0.99);
  p,
  a {
    color: #fff;
  }
  .navLinks li {
    text-transform: uppercase;
    padding: 1rem;
  }
  .navLinks li a {
    transition: color 0.2s ease;
  }
  .navLinks li a:hover {
    color: #6c63ff;
    transition: color 0.2s ease;
  }
  li::marker {
    content: '';
    margin: 0;
  }
`;

const NavLinksStyled = styled.div`
  font-family: 'Jetbrains Mono';
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
  }
  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LogoStyled = styled.div`
  img {
    transform: scale(0.5);
  }
`;

export { Container, NavLinksStyled, LogoStyled };
