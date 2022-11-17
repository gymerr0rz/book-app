import React from 'react';
import { LoginContainer, LoginForm } from './Login.styled';

const LoginPage = () => {
  return (
    <>
      <LoginContainer>
        <LoginForm>
          <h1>Welcome back!</h1>
          <p>Login into your account</p>
          <div className="username">
            <p>Username</p>
            <input
              type="text"
              name="username"
              placeholder="Enter your username..."
            />
          </div>
          <div className="password">
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
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
          <p>
            Don't have an account? <a>Register</a>
          </p>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export { LoginPage };
