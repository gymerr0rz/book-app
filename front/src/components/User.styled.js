import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-family: 'Jetbrains Mono';
    font-size: 1rem;
    padding: 0px 20px;
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
`;

export { ProfileAvatar, ProfileContainer, ProfileAvatarContainer };
