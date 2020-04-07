import React from 'react';
import classes from './Footer.module.css';
import Login from './Login/Login';

const footer = props => {
  let loginFields = null;

  if (props.showLoginFields) {
    loginFields = (
      <Login
        changed={props.changed}
        submitted={() => props.submitted(props.username, props.password)}
        username={props.username}
        password={props.password}
      />
    );
  }
  let button = null;
  if (!props.isLoggedIn) {
    button = (
      <button
        className={classes.button}
        onClick={props.loginButtonClick}
        href='#'
      >
        Log-in
      </button>
    );
  } else {
    button = (
      <button
        className={classes.button}
        onClick={props.logoutButtonClick}
        href='#'
      >
        Log-out
      </button>
    );
  }
  return (
    <div className={classes.footer}>
      <div className={classes.brand}>Made by Kris Heijnen</div>
      {loginFields}

      {button}
    </div>
  );
};

export default footer;
