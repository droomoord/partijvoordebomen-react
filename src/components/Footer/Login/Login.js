import React from 'react';
import classes from './Login.module.css';

const login = props => {
  const keyDown = event => {
    if (event.key === 'Enter'){
      props.submitted()
    }
  }
  return (
    <div>
      <input className={classes.login} onChange={props.changed} onKeyDown={keyDown} value={props.username} type='text' placeholder='username' />
      <input className={classes.login} onChange={props.changed} onKeyDown={keyDown} value={props.password} type='password' placeholder='password' />
      <input className={classes.login} type="submit" onClick={props.submitted}/>
    </div>
  );
};

export default login;
