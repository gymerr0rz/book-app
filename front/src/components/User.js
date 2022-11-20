import React, { Component } from 'react';
import profileAvatar from '../assets/profile-avatar.svg';
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileAvatarContainer,
} from './User.styled';
import { Link } from 'react-router-dom';
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }
  handleClick() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:4000/userData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.state.username = data.data.username;
          const loginName = document.querySelector('.login');
          loginName.innerHTML = `<p>Welcome back,<a>${this.state.username}!</a></p><span>Log Out</span>`;
          const logoutBtn = loginName.querySelector('span');
          logoutBtn.addEventListener('click', () => {
            this.handleClick();
          });
        })
        .catch((err) => console.log(err));
    }

    fetch('http://localhost:4000/userData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.state.username = data.data.username;
        const loginName = document.querySelector('.login');
        loginName.innerHTML = `<p>Welcome back,<a>${this.state.username}!</a></p><span>Log Out</span>`;
        const logoutBtn = loginName.querySelector('span');
        logoutBtn.addEventListener('click', () => {
          this.handleClick();
        });
      })
      .catch((err) => console.log(err));

  }

  render() {
    return (
      <ProfileContainer className="profile">
        <div className="login">
          <Link to="/register">Register</Link> / <Link to="/login">Login</Link>
        </div>
        <ProfileAvatarContainer>
          <ProfileAvatar src={profileAvatar} alt="test" />
        </ProfileAvatarContainer>
      </ProfileContainer>
    );
  }
}
