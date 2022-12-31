import styled from 'styled-components';

const BooksContainer = styled.div`
  .documentStyling {
    display: flex;
    gap: 20px;
    border-radius: 26px;
    padding: 100px 0;
    .pageStyling {
      border-radius: 46px;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 85vh;
  overflow: auto;
  background-color: rgba(16, 17, 28, 0.98);
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  position: absolute;
  span {
    border-radius: 100%;
    padding: 20px 25px;
  }
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
