import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  a {
    transition: color 0.2s ease;
  }
  a:hover {
    color: #6c63ff;
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
