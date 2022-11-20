import React, { Component, useEffect } from 'react';
import profileAvatar from '../assets/profile-avatar.svg';
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileAvatarContainer,
} from './User.styled';
import { Link } from 'react-router-dom';
const token = localStorage.getItem('token');
console.log(token);

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
  }

  fetchUserInfo() {
    fetch('http://localhost:4000/userData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: {
        token,
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        this.state.username = data.username;
      });
  }

  render() {
    return (
      <ProfileContainer className="profile">
        <Link to="/register">Register</Link> /<Link to="/login">Login</Link>
        <ProfileAvatarContainer>
          <ProfileAvatar src={profileAvatar} alt="test" />
        </ProfileAvatarContainer>
      </ProfileContainer>
    );
  }
}
