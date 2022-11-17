import React from 'react';
import { RegisterContainer, RegisterForm } from './Register.styled';

const RegisterPage = () => {
  return (
    <>
      <RegisterContainer>
        <RegisterForm>
          <h1>Welcome to Liber</h1>
          <p>Create your account</p>
          <div className="email">
            <p>E-mail</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
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
          <button>Create an account</button>
          <p>
            Already have an account? <a>Sign Up</a>
          </p>
        </RegisterForm>
      </RegisterContainer>
    </>
  );
};

export { RegisterPage };
