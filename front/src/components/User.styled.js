import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
  color: #fff;
  a {
    font-family: 'Jetbrains Mono';
    font-size: 1rem;
    padding: 5px;
  }
  p {
    font-family: 'Jetbrains Mono';
    font-size: 1rem;
  }

  .login a {
    font-weight: normal;
    text-transform: uppercase;
  }
  span {
    font-family: 'JetBrains Mono';
    padding: 0 5px;
    cursor: pointer;
    color: #6c63ff;
    transition: color 0.2s ease;
    text-transform: uppercase;
  }
  span:hover {
    color: #353177;
    transition: color 0.2s ease;
  }

  i {
    display: inline;
    font-size: 1.5rem;
    transition: color 0.3s ease;
    border-radius: 100%;
  }

  i:hover {
    transition: color 0.3s ease;
    color: gray;
  }
`;

const ProfileAvatar = styled.img`
  height: 60px;
`;

const ProfileAvatarContainer = styled.div`
  height: 60px;
  width: 60px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin: 10px;
`;

export { ProfileAvatar, ProfileContainer, ProfileAvatarContainer };
