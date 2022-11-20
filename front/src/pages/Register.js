import React, { Component } from 'react';
import { RegisterContainer, RegisterForm } from './Register.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    e.preventDefault();
    const { email, username, password } = this.state;
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
        console.log(data);
        if (data.status === 'success') {
          toast.success('Account Created', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          window.localStorage.setItem('token', data.data);
          setTimeout(() => {
            window.location.href = './login';
          }, 2000);
        }
        // if (data.status == 'error') {
        //   toast.error('Incorrect Password or Email', {
        //     position: 'top-right',
        //     autoClose: 2000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'dark',
        //   });
        // }
      });
  }

  render() {
    return (
      <>
        <ToastContainer />
        <RegisterContainer>
          <RegisterForm>
            <form onSubmit={this.handleSubmit}>
              <h1>Welcome to Liber</h1>
              <p>Create your account!</p>
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
              <button className="submitForm">Create an account</button>
              <p>
                Already have an account? <a>Sign Up</a>
              </p>
            </form>
          </RegisterForm>
        </RegisterContainer>
      </>
    );
  }
}

export { RegisterPage };
