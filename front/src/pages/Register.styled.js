import styled from 'styled-components';

const RegisterContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 85vh;
  background-color: rgba(16, 17, 28, 0.98);
`;

const RegisterForm = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 400px;
  padding: 50px 30px;
  font-family: 'Overpass';
  p {
    color: #fff;
    margin: 0 0 20px 0;
    color: gray;
    a {
      color: #6c63ff;
    }
  }

  .email {
    p {
      margin: 0;
    }
  }
  .username {
    p {
      margin: 0;
    }
  }
  .password {
    p {
      margin: 0;
    }
  }
  h1 {
    text-align: left;
    font-size: 2rem;
    color: #fff;
  }
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    border: none;
    border-bottom: 1px #6c63ff solid;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 10px 0;
    padding: 15px 10px;
    width: 100%;
    position: relative;
    color: #fff;
  }

  input::placeholder {
    position: absolute;
    left: 10px;
    color: #fff;
  }

  input:focus {
    outline: none;
  }

  .forgot-password {
    color: gray;
    display: flex;
    font-size: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    width: 100%;
    input[type='checkbox'] {
      margin: 0 10px 0 0;
    }
    a {
      color: #6c63ff;
      cursor: pointer;
    }
  }

  button {
    padding: 20px 15px;
    width: 100%;
    border: none;
    text-transform: uppercase;
    background-color: #1a1b26;
    font-family: 'Jua';
    font-size: 1rem;
    margin: 20px 0;
    cursor: pointer;
    color: #6c63ff;
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

export { RegisterContainer, RegisterForm };
