import styled from 'styled-components';

const BooksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 190px;
  text-align: center;
  height: 85vh;
  width: 100vw;
  font-family: 'Jua';
  background-color: rgba(16, 17, 28, 0.98);
  position: relative;
  overflow: hidden;

  h1 {
    color: #fff;
    font-size: 64px;
  }
  p {
    max-width: 90%;
    color: #fff;
    font-size: 20px;
    padding: 5px 0 30px 0;
    margin: 0 auto;
  }
  button {
    width: 50%;
    padding: 20px 15px;
    border-radius: 46px;
    border: none;
    text-transform: uppercase;
    background-color: #6c63ff;
    font-family: 'Jua';
    font-size: 1rem;
    color: #fff;
    transition: background-color 0.2s ease, transform 0.1s ease;
    cursor: pointer;
  }

  button:hover {
    background-color: #353177;
    transition: background-color 0.2s ease;
  }

  button:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    opacity: 20%;
  }

  .books-text {
    z-index: 1;
  }
`;

export { BooksContainer };
