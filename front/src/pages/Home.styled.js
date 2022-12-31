import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 190px;
  height: 85vh;
  overflow: hidden;
  width: 100vw;
  font-family: 'Overpass';
  background-color: rgba(16, 17, 28, 0.98);
  img {
    width: 100%;
    align-self: center;
    height: 70%;
    padding: 0 100px 0 0;
    overflow: hidden;
  }
`;

const HomeText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;
  flex-wrap: nowrap;
  h1 {
    font-size: 3rem;
    color: #fff;
  }
  .main-text {
    margin: 10px;
    font-family: 'Overpass';
    font-weight: 400;
  }
  p {
    color: #fff;
    font-family: 'JetBrains Mono';
    margin: 0 0 15px 0;
  }
  button {
    width: 250px;
    padding: 20px 15px;
    border-radius: 46px;
    border: none;
    text-transform: uppercase;
    background-color: #6c63ff;
    font-family: 'Overpass';
    font-weight: 800;
    font-size: 1rem;
    margin: 20px;
    cursor: pointer;
    color: #fff;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  button:hover {
    background-color: #353177;
    transition: background-color 0.2s ease;
  }

  button:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
`;

export { HomeText, HomeContainer };
