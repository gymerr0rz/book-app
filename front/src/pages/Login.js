import React, { Component } from 'react';
import { LoginContainer, LoginForm } from './Login.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export let usersName = '';
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, username } = this.state;
    console.log(email, password, username);
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
        if (data.status == 'success') {
          toast.success('Login Successful', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          this.state.username = username;
          usersName = this.state.username;

          setTimeout(() => {
            window.localStorage.setItem('token', data.data);
            window.location.href = './';
          }, 2000);
        }
        if (data.status == 'error') {
          toast.error('Incorrect Password or Email', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      });
  }

  render() {
    return (
      <>
        <ToastContainer />
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
