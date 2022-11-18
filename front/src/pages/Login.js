import React, { Component } from 'react';
import { LoginContainer, LoginForm } from './Login.styled';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    console.log(email, password);
    fetch('http://localhost:4000/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        if (data.status == 'ok') {
          alert('login successful');
          window.localStorage.setItem('token', data.data);
          window.location.href = './userDetails';
        }
      });
  }

  render() {
    return (
      <>
        <LoginContainer>
          <LoginForm>
            <h1>Welcome back!</h1>
            <p>Login into your account</p>
            <form onSubmit={this.handleSubmit}>
              <div className="email">
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email..."
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="password">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="forgot-password">
                <div>
                  <input type="checkbox" />
                  Remember for 30 days
                </div>
                <a>Forgot password</a>
              </div>
              <button>Login</button>
            </form>
            <p>
              Don't have an account? <a>Register</a>
            </p>
          </LoginForm>
        </LoginContainer>
      </>
    );
  }
}

export { LoginPage };
