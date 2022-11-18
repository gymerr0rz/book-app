import React, { Component } from 'react';
import { RegisterContainer, RegisterForm } from './Register.styled';

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email, username, password } = this.state;
    console.log(email, username, password);
    fetch('http://localhost:4000/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
      });
  }

  render() {
    return (
      <>
        <RegisterContainer>
          <RegisterForm>
            <h1>Welcome to Liber</h1>
            <p>Create your account</p>
            <form onSubmit={this.handleSubmit}>
              <div className="email">
                <p>E-mail</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="username">
                <p>Username</p>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username..."
                  onChange={(e) => this.setState({ username: e.target.value })}
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
              <button>Create an account</button>
            </form>
            <p>
              Already have an account? <a>Sign Up</a>
            </p>
          </RegisterForm>
        </RegisterContainer>
      </>
    );
  }
}

export { RegisterPage };
