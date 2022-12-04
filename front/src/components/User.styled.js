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
`;

const ProfileAvatar = styled.img`
  height: 80px;
`;

const ProfileAvatarContainer = styled.div`
  height: 80px;
  width: 80px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin: 0 0 0 20px;
`;

export { ProfileAvatar, ProfileContainer, ProfileAvatarContainer };
