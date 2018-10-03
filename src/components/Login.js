import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const LoginButton = styled.button`
  cursor: pointer;
  padding: 20px;
  border: 2px solid #eee;
  margin: 20px;
  background-color: white;
  border-radius: 2px;
  font-size: 18px;

  &:hover {
    background: papayawhip;
  }
`;

/* <LoginButton className="email" onClick={() => props.authenticate("Email")}>
Log In With Email
</LoginButton> */

const Login = props => (
  <nav className="login">
    <h2>Login</h2>
    <p>Log in om je luisterlijst te beluisteren</p>
    <LoginButton blue onClick={() => props.authenticate("Google")}>
      Log In met Google
    </LoginButton>

  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
