import React from 'react';
import profileAvatar from '../assets/profile-avatar.svg';
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileAvatarContainer,
} from './User.styled';

const User = () => {
  return (
    <ProfileContainer className="profile">
      <p>Welcome back, Asco!</p>
      <ProfileAvatarContainer>
        <ProfileAvatar src={profileAvatar} alt="test" />
      </ProfileAvatarContainer>
    </ProfileContainer>
  );
};

export default User;
