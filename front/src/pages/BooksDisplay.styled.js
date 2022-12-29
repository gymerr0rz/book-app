import styled from 'styled-components';

const BooksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: rgba(16, 17, 28, 0.98);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100px;
  margin: 0 auto;
  border-radius: 46px;
  span:hover {
    transition: background-color 0.3s ease;
    background-color: #2a244f;
  }
`;

const Buttons = styled.span`
  transition: background-color 0.3s ease;
  background-color: #6c63ff;
  padding: 20px;
  i {
    color: #fff;
  }
`;

export { Buttons, Container, BooksContainer };
