import React from 'react';
import profileAvatar from '../assets/profile-avatar.svg';
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileAvatarContainer,
} from './User.styled';
import { Link } from 'react-router-dom';

const user = false;

function UserRegistered() {
  if (user) {
    return <p>Welcome back, Asco!</p>;
  } else {
    return (
      <>
        <Link to="/register">Register</Link>/<Link to="/login">Login</Link>
      </>
    );
  }
}

const User = () => {
  return (
    <ProfileContainer className="profile">
      {UserRegistered()}
      <ProfileAvatarContainer>
        <ProfileAvatar src={profileAvatar} alt="test" />
      </ProfileAvatarContainer>
    </ProfileContainer>
  );
};

export default User;
